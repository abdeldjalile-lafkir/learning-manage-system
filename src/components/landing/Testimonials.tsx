"use client";

import { TestimonialsColumn } from "@/components/blocks/TestimonialsColumn";
import { motion } from "motion/react";
import LandingTitles from "@/components/shared/LandingTitles";
import { useTranslations } from "next-intl";
const testimonials = [
  {
    text: "كمعلّمة، أثمن جودة المحتوى وسهولة استخدام الأدوات التعليمية. التكامل مع السبّورة الرقمية سهّل عليّ الشرح والتفاعل.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "نادية حسين",
    role: "مدرسة لغة عربية",
  },
  {
    text: "The interactive lessons and instant feedback helped my daughter finally understand algebra. She went from struggling to confident in just weeks!",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Sarah Mitchell",
    role: "Parent",
  },
  {
    text: "الشرح واضح، والاختبارات مُحكمة، وأحبّ خاصية تتبع التقدم — أشعر أن تعلّمي أصبح منظّمًا وفعّالًا.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "ياسين خالد",
    role: "طالب ثانوي",
  },
  {
    text: "My son was falling behind in science, but this platform made learning fun again. The gamification features really keep him engaged!",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Michael Thompson",
    role: "Parent",
  },
  {
    text: "أفضل ما في المنصة هو تنوّع أساليب العرض — فيديو، رسوم متحركة، أنشطة تفاعلية — فتناسب جميع أنماط المتعلّمين.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "منى إبراهيم",
    role: "أخصائية تربوية",
  },
  {
    text: "The bite-sized video lessons are perfect for my busy schedule. I can study during my commute and the progress tracking keeps me motivated.",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    name: "Emily Chen",
    role: "College Student",
  },
  {
    text: "منصة رائعة! ساعدت ابني على فهم الرياضيات بسهولة من خلال الدروس التفاعلية والدعم الفوري من المدرّسين.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "فاطمة عبد الله",
    role: "ولية أمر",
  },
  {
    text: "As a teacher, I love how the platform adapts to each student's pace. The analytics dashboard gives me real insights into their progress.",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "James Rodriguez",
    role: "High School Teacher",
  },
  {
    text: "كنا نبحث عن بديل موثوق للدروس الخصوصية، وهذه المنصة قدّمت أكثر مما توقعنا: جودة، تنظيم، ودعم مستمر.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "خالد رشيد",
    role: "ولي أمر",
  },
  {
    text: "ما يميّز المنصة هو التغذية الراجعة الفورية بعد كل تمرين — هذا عامل حاسم في تصحيح المفاهيم الخاطئة فورًا.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "سارة توفيق",
    role: "طالبة إعدادي",
  },
  {
    text: "I appreciate how the platform combines visual, auditory, and kinesthetic learning styles. It's accessible for all types of learners.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "David Williams",
    role: "Education Consultant",
  },
  {
    text: "الفيديوهات القصيرة والمُركّزة، مع وجود ملخّصات قابلة للتنزيل، ساعدتني كثيرًا في المراجعة قبل الامتحانات.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "لمى سامي",
    role: "طالبة جامعية",
  },
  {
    text: "حقّقت ابنتي المركز الأول على صفّها بعد 4 أشهر فقط من الاستخدام المنتظم. المنصة غيّرت مفهومنا عن التعلّم الرقمي.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "طارق سليمان",
    role: "ولي أمر",
  },
  {
    text: "The variety of practice problems and the detailed explanations for each answer helped me ace my finals. Best investment in my education!",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Jessica Park",
    role: "University Student",
  },
  {
    text: "ابنتي كانت تُعاني من ضعف في الفيزياء، لكن بعد شهر من استخدام المنصة، تحسّن مستواها بشكل ملحوظ. شكرًا لكم!",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "أحمد مصطفى",
    role: "ولي أمر",
  },

  // 25 NEW REVIEWS BELOW

  {
    text: "The platform turned studying from a stressful task into an enjoyable routine. The structured paths make it easy to know what to learn next.",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    name: "Oliver Brown",
    role: "High School Student",
  },
  {
    text: "As a busy mom, I love that I can track my kids’ progress from my phone. The reports are clear and easy to understand.",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    name: "Laura Evans",
    role: "Parent",
  },
  {
    text: "The live support from tutors makes a huge difference. Whenever I get stuck, I can get help in minutes instead of waiting for the next class.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Daniel King",
    role: "College Student",
  },
  {
    text: "منصة متكاملة فعلًا. أحبّ تنوّع الأسئلة بين الاختيار المتعدد والمسائل المفتوحة، فهذا يساعد الطلاب على التفكير العميق.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "سعيد الزهراني",
    role: "معلم علوم",
  },
  {
    text: "استطعت من خلال المنصة تعويض الفجوة التي حدثت أثناء التعلم عن بعد. المحتوى منظم والطلاب يتفاعلون معه بحماس.",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    name: "هبة العلي",
    role: "مشرفة تربوية",
  },
  {
    text: "The mobile app is smooth and reliable. I can download lessons offline, which helps a lot when my internet connection is weak.",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    name: "Liam Scott",
    role: "University Student",
  },
  {
    text: "I recommend this platform to all my friends. The mix of theory, practice, and quizzes keeps me engaged without feeling overwhelmed.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    name: "Chloe Martin",
    role: "High School Student",
  },
  {
    text: "واجهت صعوبة في متابعة مستوى أولادي في أكثر من مادة، لكن لوحة التحكم في المنصة جمعت كل شيء في مكان واحد وبطريقة واضحة.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    name: "مروان خليل",
    role: "ولي أمر",
  },
  {
    text: "التحديثات المستمرة وإضافة وحدات جديدة تشعرني أن المنصة حية ومتطورة، وليست مجرد محتوى ثابت.",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    name: "رنا العوض",
    role: "طالبة ثانوي",
  },
  {
    text: "The exams on the platform are very similar to real school exams. Practicing here made me feel calm and prepared on test day.",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    name: "Ethan Walker",
    role: "Middle School Student",
  },
  {
    text: "As an educational supervisor, I value the clear learning outcomes and alignment with curriculum standards. It’s not just random content.",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "Maria Lopez",
    role: "Education Supervisor",
  },
  {
    text: "منصة سهلة الاستخدام حتى لغير المتمرسين في التقنية. لم أحتج وقتًا طويلًا لأتعرّف على خصائصها وأبدأ باستخدامها مع طلابي.",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    name: "إبراهيم الدليمي",
    role: "معلم رياضيات",
  },
  {
    text: "My daughter enjoys the badges and rewards system. It motivates her to complete more lessons without me having to push her.",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    name: "Natalie Green",
    role: "Parent",
  },
  {
    text: "The explanations are simple without being shallow. Difficult concepts in physics and chemistry suddenly became understandable.",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    name: "Henry Adams",
    role: "High School Student",
  },
  {
    text: "استثمرت المدرسة في هذه المنصة ولاحظنا تحسنًا واضحًا في نتائج الطلاب، خاصة في المواد العلمية واللغات.",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    name: "ليلى قاسم",
    role: "مديرة مدرسة",
  },
  {
    text: "I love that I can revisit any lesson as many times as I need. There’s no embarrassment like in a physical classroom.",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    name: "Adam Turner",
    role: "College Freshman",
  },
  {
    text: "التدرّج في مستوى الصعوبة داخل الوحدة الواحدة يساعد الطلاب على بناء ثقتهم بأنفسهم خطوة بخطوة.",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    name: "نجلاء يوسف",
    role: "أخصائية نفسية",
  },
  {
    text: "The customer support team is responsive and friendly. They solved my login issue quickly so my son didn’t miss his study plan.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Jason Miller",
    role: "Parent",
  },
  {
    text: "I used the platform to prepare for my university entrance exams. The targeted practice sets saved me a lot of time.",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    name: "Hannah Baker",
    role: "Prospective University Student",
  },
  {
    text: "استفدت كثيرًا من بنك الأسئلة الكبير، خاصة مع إمكانية إنشاء اختبارات مخصصة لطلابي بحسب نقاط ضعفهم.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    name: "فراس النجار",
    role: "معلم فيزياء",
  },
  {
    text: "كون المنصة متاحة على مدار 24 ساعة يساعدني على الدراسة في الأوقات التي تناسبني، صباحًا أو ليلًا.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "جود الحسن",
    role: "طالبة جامعية",
  },
  {
    text: "The interface is clean and distraction-free. I can focus on learning instead of trying to figure out where everything is.",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    name: "Noah Carter",
    role: "Student",
  },
  {
    text: "I was skeptical at first, but after a month my grades improved and I actually enjoy revising with the interactive exercises.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    name: "Sophie Allen",
    role: "High School Student",
  },
  {
    text: "أكثر ما أعجبني هو وجود شروحات مكتوبة بجانب الفيديو، مما يساعد الطلاب الذين يفضلون القراءة على الفهم بشكل أفضل.",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
    name: "معاذ الشامي",
    role: "مدرس لغة إنجليزية",
  },
  {
    text: "تجربة التعلّم التعاوني داخل المنصة من خلال الغرف النقاشية عززت التواصل بين الطلاب وساعدتهم على تبادل الخبرات.",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    name: "سندس مراد",
    role: "طالبة ثانوي",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  const t = useTranslations("landing.testimonials");
  return (
    <section className="my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-135 mx-auto"
        >
          <LandingTitles title={t("title")} subtitle={t("subtitle")} />
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-185 overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
