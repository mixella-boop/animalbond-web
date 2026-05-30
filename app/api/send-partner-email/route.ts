import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export async function POST(req: NextRequest) {
  try {
    // ── Auth: doar adminii pot declanșa emailuri de partener ──
    const authHeader = req.headers.get('authorization') || ''
    const token = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Client care rulează CU sesiunea userului → auth.uid() funcționează în RLS
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Sursa unică de admin = profiles.is_admin (aceeași folosită de RLS-ul partners)
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()
    if (!profile?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { partnerId, type, locale = 'en' } = await req.json()

    if (!partnerId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get partner name + email from database (NU din request — anti-spam/phishing)
    const { data: partner, error: dbError } = await supabase
      .from('partners')
      .select('company_name, email')
      .eq('id', partnerId)
      .single()

    if (dbError || !partner || !partner.email) {
      console.error('Partner not found:', dbError)
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      )
    }

    const { subject, html } = getEmailTemplate(type, partner.company_name, locale)

    // Send via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AnimalBond <noreply@animalbond.club>',
        to: partner.email,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    const emailResult = await response.json()

    return NextResponse.json(
      { success: true, emailId: emailResult.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

function getEmailTemplate(
  type: string,
  companyName: string,
  locale: string
): { subject: string; html: string } {
  if (type === 'approved_gold') {
    return getGoldApprovalEmail(companyName, locale)
  }

  // Default fallback
  return {
    subject: 'AnimalBond Partnership Update',
    html: '<p>Thank you for applying to AnimalBond!</p>',
  }
}

function getGoldApprovalEmail(
  companyName: string,
  locale: string
): { subject: string; html: string } {
  const translations: Record<string, { subject: string; html: string }> = {
    ro: {
      subject: '🎉 Ești aprobat ca Partener Gold AnimalBond!',
      html: `
<h2>Felicitări! 🎉</h2>
<p>Echipa AnimalBond este bucuroasă să-ți anunțe că <strong>${companyName}</strong> a fost aprobată ca <strong>Partener Gold</strong>!</p>

<h3>Ce înseamnă asta:</h3>
<ul>
  <li>✅ Parteneriatul tău este <strong>activ imediat</strong></li>
  <li>✅ Apari în <strong>aplicația AnimalBond</strong> și pe <strong>site-ul web</strong></li>
  <li>✅ Primești <strong>vizibilitate premium</strong> în fața a mii de proprietari de animale</li>
  <li>✅ <strong>Fără plată</strong> - suntem honoriți să te avem ca partener</li>
</ul>

<p>Partenerii Gold ai acces la oportunități exclusive și suport prioritar din echipa AnimalBond.</p>

<p>Mulțumim că faci parte din comunitatea noastră și că ajuți animale și familii să se găsească! 🐾</p>

<p>Cu plăcere,<br><strong>Echipa AnimalBond</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Dacă ai întrebări, contactează-ne la <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    en: {
      subject: '🎉 You\'re Approved as an AnimalBond Gold Partner!',
      html: `
<h2>Congratulations! 🎉</h2>
<p>The AnimalBond team is delighted to announce that <strong>${companyName}</strong> has been approved as a <strong>Gold Partner</strong>!</p>

<h3>What this means:</h3>
<ul>
  <li>✅ Your partnership is <strong>active immediately</strong></li>
  <li>✅ You appear in the <strong>AnimalBond app</strong> and <strong>website</strong></li>
  <li>✅ You get <strong>premium visibility</strong> to thousands of animal owners</li>
  <li>✅ <strong>No payment</strong> - we're honored to have you as a partner</li>
</ul>

<p>Gold Partners have access to exclusive opportunities and priority support from the AnimalBond team.</p>

<p>Thank you for being part of our community and helping animals and families find each other! 🐾</p>

<p>Best regards,<br><strong>AnimalBond Team</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">If you have questions, contact us at <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    de: {
      subject: '🎉 Sie sind als AnimalBond Gold-Partner genehmigt!',
      html: `
<h2>Glückwunsch! 🎉</h2>
<p>Das AnimalBond-Team freut sich, Ihnen mittzuteilen, dass <strong>${companyName}</strong> als <strong>Gold-Partner</strong> genehmigt wurde!</p>

<h3>Was das bedeutet:</h3>
<ul>
  <li>✅ Ihre Partnerschaft ist <strong>sofort aktiv</strong></li>
  <li>✅ Sie erscheinen in der <strong>AnimalBond-App</strong> und auf der <strong>Website</strong></li>
  <li>✅ Sie erhalten <strong>Premium-Sichtbarkeit</strong> vor Tausenden von Tierbesitzern</li>
  <li>✅ <strong>Keine Zahlung</strong> - wir freuen uns, Sie als Partner zu haben</li>
</ul>

<p>Gold-Partner haben Zugang zu exklusiven Möglichkeiten und Priority-Support vom AnimalBond-Team.</p>

<p>Danke, dass Sie Teil unserer Gemeinschaft sind und Tieren und Familien helfen, sich zu finden! 🐾</p>

<p>Mit freundlichen Grüßen,<br><strong>AnimalBond Team</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Bei Fragen kontaktieren Sie uns unter <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    fr: {
      subject: '🎉 Vous êtes approuvé en tant que Partenaire Gold AnimalBond !',
      html: `
<h2>Félicitations ! 🎉</h2>
<p>L'équipe AnimalBond a le plaisir de vous annoncer que <strong>${companyName}</strong> a été approuvé en tant que <strong>Partenaire Gold</strong> !</p>

<h3>Ce que cela signifie :</h3>
<ul>
  <li>✅ Votre partenariat est <strong>actif immédiatement</strong></li>
  <li>✅ Vous apparaissez dans l'<strong>application AnimalBond</strong> et sur le <strong>site Web</strong></li>
  <li>✅ Vous bénéficiez d'une <strong>visibilité premium</strong> auprès de milliers de propriétaires d'animaux</li>
  <li>✅ <strong>Aucun paiement</strong> - nous sommes honorés de vous avoir comme partenaire</li>
</ul>

<p>Les partenaires Gold ont accès à des opportunités exclusives et au support prioritaire de l'équipe AnimalBond.</p>

<p>Merci de faire partie de notre communauté et d'aider les animaux et les familles à se trouver ! 🐾</p>

<p>Cordialement,<br><strong>Équipe AnimalBond</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Si vous avez des questions, contactez-nous à <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    it: {
      subject: '🎉 Sei approvato come Partner Gold AnimalBond!',
      html: `
<h2>Congratulazioni! 🎉</h2>
<p>Il team AnimalBond è lieto di annunciarvi che <strong>${companyName}</strong> è stato approvato come <strong>Partner Gold</strong>!</p>

<h3>Cosa significa:</h3>
<ul>
  <li>✅ La tua partnership è <strong>attiva immediatamente</strong></li>
  <li>✅ Appari nell'<strong>app AnimalBond</strong> e sul <strong>sito web</strong></li>
  <li>✅ Ottieni <strong>visibilità premium</strong> davanti a migliaia di proprietari di animali</li>
  <li>✅ <strong>Nessun pagamento</strong> - siamo onorati di averti come partner</li>
</ul>

<p>I Partner Gold hanno accesso a opportunità esclusive e supporto prioritario dal team AnimalBond.</p>

<p>Grazie di far parte della nostra comunità e di aiutare gli animali e le famiglie a trovarsi! 🐾</p>

<p>Cordiali saluti,<br><strong>Team AnimalBond</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Per domande, contattaci a <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    es: {
      subject: '🎉 ¡Aprobado como Socio Gold de AnimalBond!',
      html: `
<h2>¡Felicidades! 🎉</h2>
<p>¡El equipo AnimalBond se complace en anunciar que <strong>${companyName}</strong> ha sido aprobado como <strong>Socio Gold</strong>!</p>

<h3>Qué significa esto:</h3>
<ul>
  <li>✅ Tu asociación es <strong>activa inmediatamente</strong></li>
  <li>✅ Apareces en la <strong>aplicación AnimalBond</strong> y en el <strong>sitio web</strong></li>
  <li>✅ Obtienes <strong>visibilidad premium</strong> ante miles de propietarios de animales</li>
  <li>✅ <strong>Sin pago</strong> - nos honra tenerte como socio</li>
</ul>

<p>Los Socios Gold tienen acceso a oportunidades exclusivas y soporte prioritario del equipo AnimalBond.</p>

<p>¡Gracias por ser parte de nuestra comunidad y ayudar a los animales y las familias a encontrarse! 🐾</p>

<p>Saludos cordiales,<br><strong>Equipo AnimalBond</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Si tienes preguntas, contáctanos en <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    hu: {
      subject: '🎉 Gold Partner-ként jóváhagyva az AnimalBond-nál!',
      html: `
<h2>Gratulálunk! 🎉</h2>
<p>Az AnimalBond csapat örömmel közli, hogy <strong>${companyName}</strong> <strong>Gold Partnerként</strong> jóváhagyva lett!</p>

<h3>Mit jelent ez:</h3>
<ul>
  <li>✅ A partnersége <strong>azonnal aktív</strong></li>
  <li>✅ Megjelenik az <strong>AnimalBond alkalmazásban</strong> és a <strong>webhelyen</strong></li>
  <li>✅ <strong>Prémium láthatóságot</strong> kapsz több ezer állattulajdonos előtt</li>
  <li>✅ <strong>Nincs fizetés</strong> - megtiszteltetés neked partnerünk lenni</li>
</ul>

<p>A Gold Partnerek exkluzív lehetőségekhez és az AnimalBond csapat prioritásos támogatásához férnek hozzá.</p>

<p>Köszönjük, hogy részese vagy a közösségünknek és segítesz az állatoknak és családoknak megtalálni egymást! 🐾</p>

<p>Üdvözlettel,<br><strong>AnimalBond Csapat</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Ha kérdéseid vannak, fordulj hozzánk a <a href="mailto:contact@animalbond.club">contact@animalbond.club</a> címen</p>
      `,
    },
    pt: {
      subject: '🎉 Foste aprovado como Parceiro Gold da AnimalBond!',
      html: `
<h2>Parabéns! 🎉</h2>
<p>A equipa AnimalBond tem o prazer de anunciar que <strong>${companyName}</strong> foi aprovada como <strong>Parceiro Gold</strong>!</p>

<h3>O que isto significa:</h3>
<ul>
  <li>✅ A tua parceria está <strong>ativa de imediato</strong></li>
  <li>✅ Apareces na <strong>aplicação AnimalBond</strong> e no <strong>site</strong></li>
  <li>✅ Obténs <strong>visibilidade premium</strong> perante milhares de donos de animais</li>
  <li>✅ <strong>Sem pagamento</strong> - é uma honra ter-te como parceiro</li>
</ul>

<p>Os Parceiros Gold têm acesso a oportunidades exclusivas e a suporte prioritário da equipa AnimalBond.</p>

<p>Obrigado por fazeres parte da nossa comunidade e por ajudares animais e famílias a encontrarem-se! 🐾</p>

<p>Com os melhores cumprimentos,<br><strong>Equipa AnimalBond</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Se tiveres questões, contacta-nos em <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    nl: {
      subject: '🎉 Je bent goedgekeurd als AnimalBond Gold-partner!',
      html: `
<h2>Gefeliciteerd! 🎉</h2>
<p>Het AnimalBond-team is verheugd om aan te kondigen dat <strong>${companyName}</strong> is goedgekeurd als <strong>Gold-partner</strong>!</p>

<h3>Wat dit betekent:</h3>
<ul>
  <li>✅ Je partnerschap is <strong>direct actief</strong></li>
  <li>✅ Je verschijnt in de <strong>AnimalBond-app</strong> en op de <strong>website</strong></li>
  <li>✅ Je krijgt <strong>premium zichtbaarheid</strong> bij duizenden dierenbezitters</li>
  <li>✅ <strong>Geen betaling</strong> - we zijn vereerd je als partner te hebben</li>
</ul>

<p>Gold-partners krijgen toegang tot exclusieve kansen en prioritaire ondersteuning van het AnimalBond-team.</p>

<p>Bedankt dat je deel uitmaakt van onze gemeenschap en dieren en gezinnen helpt elkaar te vinden! 🐾</p>

<p>Met vriendelijke groet,<br><strong>AnimalBond-team</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Als je vragen hebt, neem contact met ons op via <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
    ru: {
      subject: '🎉 Вы одобрены как Gold-партнёр AnimalBond!',
      html: `
<h2>Поздравляем! 🎉</h2>
<p>Команда AnimalBond рада сообщить, что <strong>${companyName}</strong> одобрена как <strong>Gold-партнёр</strong>!</p>

<h3>Что это значит:</h3>
<ul>
  <li>✅ Ваше партнёрство <strong>активно сразу</strong></li>
  <li>✅ Вы появляетесь в <strong>приложении AnimalBond</strong> и на <strong>сайте</strong></li>
  <li>✅ Вы получаете <strong>премиум-видимость</strong> для тысяч владельцев животных</li>
  <li>✅ <strong>Без оплаты</strong> - для нас честь иметь вас в партнёрах</li>
</ul>

<p>Gold-партнёры получают доступ к эксклюзивным возможностям и приоритетной поддержке от команды AnimalBond.</p>

<p>Спасибо, что вы часть нашего сообщества и помогаете животным и семьям найти друг друга! 🐾</p>

<p>С наилучшими пожеланиями,<br><strong>Команда AnimalBond</strong></p>

<hr>
<p style="font-size: 12px; color: #999;">Если у вас есть вопросы, напишите нам на <a href="mailto:contact@animalbond.club">contact@animalbond.club</a></p>
      `,
    },
  }

  return translations[locale] || translations.en
}
