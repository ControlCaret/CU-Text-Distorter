import assert from 'node:assert/strict';
import test from 'node:test';
import { distortText } from '../dist/distort.js';

const cases = [
  {
    brainHealth: 100,
    original: `보편적인 외상을 쉽고 확실하게 치료하도록 만들어진 국소 재생 장치(Localized Resuscitation Device). 사용한 신체 부위 및 인접한 신체 부위의 건강을 회복하고 출혈을 늦추며 동시에 진통제와 소독제를 투여한다. 흉부에 사용하면 내출혈을 많이 치료한다. 작동하려면 L.R.D. 혈청이 25mL 이상 필요하다.`,
    distorted: `보편적인 외상을 쉽고 확실하게 치료하도록 만들어진 국소 재생 장치(Localized Resuscitation Device). 사용한 신체 부위 및 인접한 신체 부위의 건강을 회복하고 출혈을 늦추며 동시에 진통제와 소독제를 투여한다. 흉부에 사용하면 내출혈을 많이 치료한다. 작동하려면 L.R.D. 혈청이 25mL 이상 필요하다.`
  },
  {
    brainHealth: 80,
    original: `보편적인 외상을 쉽고 확실하게 치료하도록 만들어진 국소 재생 장치(Localized Resuscitation Device). 사용한 신체 부위 및 인접한 신체 부위의 건강을 회복하고 출혈을 늦추며 동시에 진통제와 소독제를 투여한다. 흉부에 사용하면 내출혈을 많이 치료한다. 작동하려면 L.R.D. 혈청이 25mL 이상 필요하다.`,
    distorted: `보편적인 외상을 쉽고 확실&게&치!하도록 만들어진 국소 재생 장&(&o&a!ized Resuscitati&n&D&vice). 사용한 신체 부위 및&인&한!신체 부위의 건강을 회복하고 &혈& &추! 동시에 진통제와 소독제를 투&한&.&흉부에 사용하면 내출혈을 많이&치&한&.!작동하려면 L.R.D. 혈청이&2&m& 이상 필요하다.`
  },
  {
    brainHealth: 60,
    original: `보편적인 외상을 쉽고 확실하게 치료하도록 만들어진 국소 재생 장치(Localized Resuscitation Device). 사용한 신체 부위 및 인접한 신체 부위의 건강을 회복하고 출혈을 늦추며 동시에 진통제와 소독제를 투여한다. 흉부에 사용하면 내출혈을 많이 치료한다. 작동하려면 L.R.D. 혈청이 25mL 이상 필요하다.`,
    distorted: `보!적! @상을 쉽고 확실&게&치!하!록!만!어@ 국소 재생 장&(&o&a!i!e! !e@uscitati&n&D&v!c!)! !용@ 신체 부위 및&인&한!신! !위! @강을 회복하고 &혈& &추! !시! !통@와 소독제를 투&한&.&흉!에!사!하@ @출혈을 많이&치&한&.!작!하!면!L@R.D. 혈청이&2&m& !상!필!하!.`
  },
  {
    brainHealth: 40,
    original: `보편적인 외상을 쉽고 확실하게 치료하도록 만들어진 국소 재생 장치(Localized Resuscitation Device). 사용한 신체 부위 및 인접한 신체 부위의 건강을 회복하고 출혈을 늦추며 동시에 진통제와 소독제를 투여한다. 흉부에 사용하면 내출혈을 많이 치료한다. 작동하려면 L.R.D. 혈청이 25mL 이상 필요하다.`,
    distorted: `보!적! @상@ @고#확#&게&치!하!록!만!어@ @소@재@ #&#&o&a!i!e! !e@u@c@t@t#&#&D&v!c!)! !용@ @체@부# #&인&한!신! !위! @강@ @복@고#&#& &추! !시! !통@와@소@제@ #&한&.&흉!에!사!하@ @출@을@많#&#&한&.!작!하!면!L@R@D@ @청#&#&m& !상!필!하!.`
  },
  {
    brainHealth: 20,
    original: `보편적인 외상을 쉽고 확실하게 치료하도록 만들어진 국소 재생 장치(Localized Resuscitation Device). 사용한 신체 부위 및 인접한 신체 부위의 건강을 회복하고 출혈을 늦추며 동시에 진통제와 소독제를 투여한다. 흉부에 사용하면 내출혈을 많이 치료한다. 작동하려면 L.R.D. 혈청이 25mL 이상 필요하다.`,
    distorted: `$!적! @상@ @고#확#&#&#!$!$!$!어@ @소@재@ #&#&#&#!$!$! !e@u@c@t@t#&#&#&$!$!$! !용@ @체@부# #&#&#!$!$!$! @강@ @복@고#&#&#&#!$!$! !통@와@소@제@ #&#&#&$!$!$!하@ @출@을@많#&#&#&#!$!$!$!L@R@D@ @청#&#&#&#!$!$!하!.`
  },
  {
    brainHealth: 0,
    original: `보편적인 외상을 쉽고 확실하게 치료하도록 만들어진 국소 재생 장치(Localized Resuscitation Device). 사용한 신체 부위 및 인접한 신체 부위의 건강을 회복하고 출혈을 늦추며 동시에 진통제와 소독제를 투여한다. 흉부에 사용하면 내출혈을 많이 치료한다. 작동하려면 L.R.D. 혈청이 25mL 이상 필요하다.`,
    distorted: `$!$!%@%@%@고#확#&#&#!$!$!$!$@%@%@%@ #&#&#&#!$!$!$!%@%@%@%@t#&#&#&$!$!$!$!%@%@%@부# #&#&#!$!$!$!$@%@%@%@고#&#&#&#!$!$!$!%@%@%@%@ #&#&#&$!$!$!$@%@%@%@많#&#&#&#!$!$!$!$@%@%@%@청#&#&#&#!$!$!$!%`
  },
  {
    brainHealth: 100,
    original: `A Localized Resuscitation Device, made to easily provide effective general trauma care. Increases limb health, slows bleeding, provides pain relieving drugs and disinfects the limb it's used on, along with any adjacent limbs. Highly reduces internal bleeding if used on the chest. Requires at least 25mL of LRD serum to function.`,
    distorted: `A Localized Resuscitation Device, made to easily provide effective general trauma care. Increases limb health, slows bleeding, provides pain relieving drugs and disinfects the limb it's used on, along with any adjacent limbs. Highly reduces internal bleeding if used on the chest. Requires at least 25mL of LRD serum to function.`
  },
  {
    brainHealth: 80,
    original: `A Localized Resuscitation Device, made to easily provide effective general trauma care. Increases limb health, slows bleeding, provides pain relieving drugs and disinfects the limb it's used on, along with any adjacent limbs. Highly reduces internal bleeding if used on the chest. Requires at least 25mL of LRD serum to function.`,
    distorted: `A Localized Re&u&c!tation Device, m&d& &o!easily provide e&f&c&ive general trauma&c&r!. Increases limb&h&a&t!, slows bleeding& &r&vides pain relie&i&g&d!ugs and disinfec&s&t&e limb it's used o&,&a&ong with any adj&c&n& !imbs. Highly red&c&s&internal bleeding &f&u&ed on the chest.&R&q&i!es at least 25mL&o& &RD serum to functi&n&`
  },
  {
    brainHealth: 60,
    original: `A Localized Resuscitation Device, made to easily provide effective general trauma care. Increases limb health, slows bleeding, provides pain relieving drugs and disinfects the limb it's used on, along with any adjacent limbs. Highly reduces internal bleeding if used on the chest. Requires at least 25mL of LRD serum to function.`,
    distorted: `A!L!c@lized Re&u&c!t!t!o! @evice, m&d& &o!e!s!l! @rovide e&f&c&i!e!g!n!r@l trauma&c&r!.!I!c!e@ses limb&h&a&t!,!s!o!s@bleeding& &r&v!d!s!p@i@ relie&i&g&d!u!s!a!d@disinfec&s&t&e!l!m! !t@s used o&,&a&o!g!w!t@ @ny adj&c&n& !i!b!.!H@ghly red&c&s&i!t!r!a! @leeding &f&u&e! !n!t@e@chest.&R&q&i!e! !t!l@ast 25mL&o& &R! !e!u! @o functi&n&`
  },
  {
    brainHealth: 40,
    original: `A Localized Resuscitation Device, made to easily provide effective general trauma care. Increases limb health, slows bleeding, provides pain relieving drugs and disinfects the limb it's used on, along with any adjacent limbs. Highly reduces internal bleeding if used on the chest. Requires at least 25mL of LRD serum to function.`,
    distorted: `A!L!c@l@z@d#R#&u&c!t!t!o! @e@i@e@ #&#& &o!e!s!l! @r@v@d@ #&#&c&i!e!g!n!r@l@t@a#m#&c&r!.!I!c!e@s@s@l@m#&#&a&t!,!s!o!s@b@e@d@n#& &r&v!d!s!p@i@ @e@i#&#&g&d!u!s!a!d@d@s@n@e#&#&t&e!l!m! !t@s@u@e# #&,&a&o!g!w!t@ @n@ @d#&#&n& !i!b!.!H@g@l@ @e#&#&s&i!t!r!a! @l@e@i#g#&f&u&e! !n!t@e@c@e@t#&#&q&i!e! !t!l@a@t@2@m#&#& &R! !e!u! @o@f@n#t#&n&`
  },
  {
    brainHealth: 20,
    original: `A Localized Resuscitation Device, made to easily provide effective general trauma care. Increases limb health, slows bleeding, provides pain relieving drugs and disinfects the limb it's used on, along with any adjacent limbs. Highly reduces internal bleeding if used on the chest. Requires at least 25mL of LRD serum to function.`,
    distorted: `$!L!c@l@z@d#R#&#&#!$!$!$! @e@i@e@ #&#&#&#!$!$!l! @r@v@d@ #&#&#&$!$!$!n!r@l@t@a#m#&#&#!$!$!$!e@s@s@l@m#&#&#&#!$!$!o!s@b@e@d@n#&#&#&$!$!$!p@i@ @e@i#&#&#&#!$!$!$!d@d@s@n@e#&#&#&#!$!$! !t@s@u@e# #&#&#&$!$!$!t@ @n@ @d#&#&#&#!$!$!$!H@g@l@ @e#&#&#&$!$!$!a! @l@e@i#g#&#&#&$!$!$!t@e@c@e@t#&#&#&#!$!$!t!l@a@t@2@m#&#&#&$!$!$!u! @o@f@n#t#&#&`
  },
  {
    brainHealth: 0,
    original: `A Localized Resuscitation Device, made to easily provide effective general trauma care. Increases limb health, slows bleeding, provides pain relieving drugs and disinfects the limb it's used on, along with any adjacent limbs. Highly reduces internal bleeding if used on the chest. Requires at least 25mL of LRD serum to function.`,
    distorted: `$!$!%@%@%@d#R#&#&#!$!$!$!$@%@%@%@ #&#&#&#!$!$!$!%@%@%@%@ #&#&#&$!$!$!$!%@%@%@a#m#&#&#!$!$!$!$@%@%@%@m#&#&#&#!$!$!$!%@%@%@%@n#&#&#&$!$!$!$@%@%@%@i#&#&#&#!$!$!$!$@%@%@%@e#&#&#&#!$!$!$!%@%@%@%# #&#&#&$!$!$!$@%@%@%@d#&#&#&#!$!$!$!$@%@%@%@e#&#&#&$!$!$!$!%@%@%@%#g#&#&#&$!$!$!$@%@%@%@t#&#&#&#!$!$!$!%@%@%@%@m#&#&#&$!$!$!$!%@%@%@%#t#&#&`
  },
  {
    brainHealth: 100,
    original: ``,
    distorted: ``
  },
  {
    brainHealth: 0,
    original: ``,
    distorted: ``
  },
  {
    brainHealth: 100,
    original: `          `,
    distorted: `          `
  },
  {
    brainHealth: 50,
    original: `          `,
    distorted: ` ! ! @ @ @`
  },
  {
    brainHealth: 0,
    original: `          `,
    distorted: `$!$!%@%@%@`
  }
];

for (const { brainHealth, original, distorted } of cases) {
  test(`brain health ${brainHealth}: ${JSON.stringify(original)}`, () => {
    assert.equal(distortText(original, brainHealth), distorted);
  });
}
