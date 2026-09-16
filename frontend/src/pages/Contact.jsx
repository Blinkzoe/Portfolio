import SectionHeader from '../components/SectionHeader';
import ContactCard from '../components/ContactCard';
import { trackAction } from '../utils/tracking';

export default function Contact() {

  return (
    <section className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-14">

      <SectionHeader
        eyebrow="Let's Connect"
        title="Contact"
        description="Interested in discussing data engineering, software development, automation or integration projects?"
      />

      <div className="mt-10 space-y-3">

        <ContactCard
          label="Email"
          value="Orlando_zoe_m@hotmail.com"
          href="mailto:Orlando_zoe_m@hotmail.com"
          onClick={() => trackAction('Contact: Email')}
        />

        <ContactCard
          label="LinkedIn"
          value="linkedin.com/in/orlando-morales-820790178"
          href="https://www.linkedin.com/in/orlando-morales-820790178/"
          onClick={() => trackAction('Contact: LinkedIn')}
        />

        <ContactCard
          label="GitHub"
          value="github.com/Blinkzoe"
          href="https://github.com/Blinkzoe/"
          onClick={() => trackAction('Contact: GitHub')}
        />

      </div>


      <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-500 to-violet-500 p-8 text-white">

        <div className="text-xs uppercase tracking-widest text-blue-100 font-semibold">
          Based in
        </div>

        <h2 className="text-2xl font-black mt-2">
          Guadalajara, Jalisco, Mexico
        </h2>

        <p className="text-sm text-blue-50 mt-3 leading-relaxed">
          Open to opportunities involving data engineering, software
          development, automation, integrations and modern infrastructure.
        </p>

      </div>

    </section>
  );
}
