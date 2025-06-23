-- These are dummy records to be used in the parent_stories table.
-- The queries have been created by ChatGPT, and are meant to be used for testing purposes only.
-- Prompt: Create dummy records for the ref_parent_story table based on the attached schema, for different parent_story_type values. 
-- Create 4 records for each type, with realistic titles, summaries, and details. 
-- Use a variety of authors and ensure the content is suitable for children and parents.

-- Dummy data for ref_parent_story including parent_story_number and rich markdown content

-- Essentials

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  1001,
  'Understanding Emotions',
  'essentials',
  'Helping kids identify and talk about feelings.',
  '# Understanding Emotions

## Why Emotions Matter  
Learning to name and express emotions is a powerful skill.

- Helps kids build self-awareness  
- Encourages empathy  
- Supports communication

## Common Feelings  
Children may experience:

1. Happiness  
2. Sadness  
3. Anger  
4. Fear  
5. Surprise

![](frontend/src/assets/images/placeholder_parent_stories.png)

## How Parents Can Help  
Model emotional vocabulary in daily life.

![](frontend/src/assets/images/placeholder_parent_stories.png)

Talk about feelings openly.',
  'Dr. Emily Rhodes',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  1002,
  'Building Self-Esteem',
  'essentials',
  'Guiding kids to develop confidence.',
  '# Building Self-Esteem

## What is Self-Esteem?  
It''s how we feel about ourselves.

- High self-esteem leads to confidence  
- Low self-esteem can affect motivation

## Tips for Parents  
1. Praise effort, not just results  
2. Encourage positive self-talk  
3. Avoid comparisons

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Everyday Moments Matter  
Build self-worth through small wins.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Coach Jamie Tran',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  1003,
  'Making Safe Choices',
  'essentials',
  'Teaching kids how to make thoughtful and safe decisions.',
  '# Making Safe Choices

## Understanding Safe Choices  
Children face many decisions daily. Helping them weigh options builds independence.

## Step-by-Step Decisions  
1. Identify the situation  
2. List possible actions  
3. Think about consequences  
4. Make the safest choice

## Practice Scenarios  
- Crossing the road  
- Saying "no" to peer pressure

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Talk It Out  
Let kids reflect on outcomes with your support.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Lena Okafor',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  1004,
  'How to Set Boundaries',
  'essentials',
  'Encouraging children to say no and set limits.',
  '# How to Set Boundaries

## What Are Boundaries?  
They help kids stay safe and build respect.

## Types of Boundaries  
- Physical  
- Emotional  
- Social

## Why It Matters  
Boundaries empower children to:

1. Speak up  
2. Know their rights  
3. Respect others

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Teaching Moments  
Model healthy boundaries through everyday routines.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Samir Patel',
  NOW(),
  NULL,
  NULL
);

-- Bullying

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  2001,
  'What is Bullying?',
  'bullying',
  'Introducing the concept of bullying in simple terms.',
  '# What is Bullying?

## Defining Bullying  
Bullying is when someone hurts another person repeatedly and on purpose.

- Physical bullying  
- Verbal bullying  
- Social bullying

## Why It Matters  
Kids should feel safe and respected.

1. Know the signs  
2. Learn how to speak up  
3. Support others

![](frontend/src/assets/images/placeholder_parent_stories.png)

## What You Can Do  
Talk to a trusted adult.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Karen Lee',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  2002,
  'How to Ask for Help',
  'bullying',
  'Teaching kids to seek help when bullied.',
  '# How to Ask for Help

## Speak Up  
Telling someone is not tattling — it’s being brave.

## Who to Tell  
- Teachers  
- Parents  
- Trusted adults

## Practice What to Say  
"I need help. Someone is hurting me."

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Keep Talking  
If one person doesn’t listen, find another who will.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Marco Rivera',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  2003,
  'Standing Up for Others',
  'bullying',
  'Promoting empathy and allyship.',
  '# Standing Up for Others

## Be an Ally  
Support your classmates and friends.

- Say something  
- Get help  
- Be kind

## Why It Matters  
Kindness can stop bullying.

1. Make eye contact  
2. Speak calmly  
3. Stay safe

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Reflection  
How would you want someone to help you?

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Rachel Green',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  2004,
  'Dealing with Mean Words',
  'bullying',
  'Strategies for responding to verbal bullying.',
  '# Dealing with Mean Words

## Name-Calling Hurts  
Words can have a strong impact.

## Coping Tools  
- Ignore and walk away  
- Use confident body language  
- Talk to someone

## Stay Strong  
You are not alone.

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Self-Care  
Do something that makes you feel good afterward.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Thomas Chen',
  NOW(),
  NULL,
  NULL
);

-- Hygiene

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  3001,
  'Why Handwashing Matters',
  'hygiene',
  'Explaining germs and why we wash hands.',
  '# Why Handwashing Matters

## Germs Are Everywhere  
Washing hands keeps us healthy.

## When to Wash  
- Before eating  
- After using the bathroom  
- After playing outside

## How to Wash Properly  
1. Use soap  
2. Scrub for 20 seconds  
3. Rinse and dry

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Make It Fun  
Sing songs while washing.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Mina Alvi',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  3002,
  'Brushing Teeth is Fun!',
  'hygiene',
  'Making dental care enjoyable for kids.',
  '# Brushing Teeth is Fun!

## Why Brush?  
Keeps your mouth clean and fresh.

## Tips  
- Use a fun toothbrush  
- Try a timer  
- Brush with a parent

## How Often  
Twice a day, every day.

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Healthy Smiles  
Strong teeth help us eat and speak.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'David Kim',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  3003,
  'Bath Time Basics',
  'hygiene',
  'Getting clean and building routines.',
  '# Bath Time Basics

## Time to Get Clean  
Bathing washes away dirt and germs.

## How to Make It Fun  
- Bubbles  
- Toys  
- Songs

## Building a Routine  
Same time each day builds healthy habits.

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Dry Off and Feel Fresh  
Being clean feels good!

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Akira Nishida',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  3004,
  'Clean Clothes, Clean Body',
  'hygiene',
  'Understanding the importance of hygiene and clothing.',
  '# Clean Clothes, Clean Body

## Why It Matters  
Fresh clothes help stop the spread of germs.

## Tips for Kids  
- Change socks and underwear daily  
- Keep school clothes neat  
- Don’t forget hats and gloves in winter

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Help With Laundry  
Let kids sort their own clothes.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Priya Singh',
  NOW(),
  NULL,
  NULL
);

-- Sex_ed

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  4001,
  'Your Body is Yours',
  'sex_ed',
  'Body ownership and personal space.',
  '# Your Body is Yours

## Personal Space  
Everyone deserves respect.

## Key Messages  
- No one should touch you without permission  
- You can say no

## Talk to a Trusted Adult  
Speak up if something feels wrong.

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Practice Saying “No”  
Role play helps build confidence.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Sara Johnson',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  4002,
  'Private Parts and Privacy',
  'sex_ed',
  'Teaching kids about body parts and privacy.',
  '# Private Parts and Privacy

## Learn the Right Words  
Use correct terms for body parts.

## Understand Privacy  
- Some parts are private  
- Private means personal and protected

## Stay Safe  
Talk about safe vs unsafe situations.

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Keep the Conversation Going  
Make it normal to talk about bodies.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Ben Walsh',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  4003,
  'Safe vs Unsafe Touch',
  'sex_ed',
  'Helping kids recognize and react to inappropriate behavior.',
  '# Safe vs Unsafe Touch

## Know the Difference  
A hug from grandma is safe. A secret touch is not.

## What to Do  
1. Say no  
2. Get away  
3. Tell an adult

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Use Clear Rules  
“No secrets about touch” is a good rule.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Fatima Noor',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  4004,
  'Trusted Adults',
  'sex_ed',
  'Identifying safe people to talk to.',
  '# Trusted Adults

## Who Are They?  
Adults who listen, believe you, and help.

## Make a List  
- Parents  
- Teachers  
- Relatives  
- School nurse

## Safe Zones  
Find places where you can get help.

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Keep the List Updated  
Talk about who’s on your team.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Omar Bedi',
  NOW(),
  NULL,
  NULL
);

-- Habit_building

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  5001,
  'Starting a Morning Routine',
  'habit_building',
  'Making mornings smooth and stress-free.',
  '# Starting a Morning Routine

## Why Routines Help  
They prepare us for the day ahead.

## Steps  
1. Wake up at the same time  
2. Wash up  
3. Eat breakfast  
4. Get dressed

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Celebrate the Wins  
Sticker charts or high-fives!

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Hannah Lee',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  5002,
  'The Power of Saying Thank You',
  'habit_building',
  'Encouraging gratitude every day.',
  '# The Power of Saying Thank You

## Gratitude Matters  
It builds kindness and connection.

## Ways to Practice  
- Thank your caregiver  
- Thank a teacher  
- Say thank you to a friend

## Make It a Habit  
Daily gratitude = a happier mindset.

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Share Stories  
Talk about when someone thanked you.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Jamal Harris',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  5003,
  'Getting Ready for Bed',
  'habit_building',
  'Helping kids wind down and rest well.',
  '# Getting Ready for Bed

## Why Sleep is Important  
It helps us grow and feel strong.

## Bedtime Checklist  
1. Brush teeth  
2. Pajamas on  
3. Storytime  
4. Lights out

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Keep It Calm  
Avoid screens and loud play before bed.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Isabelle Ng',
  NOW(),
  NULL,
  NULL
);

INSERT INTO ref_parent_story (
  parent_story_number,
  parent_story_title,
  parent_story_type,
  parent_story_summary,
  parent_story_details,
  parent_story_author,
  parent_story_published_date,
  parent_story_featured_image_url,
  parent_story_external_url
) VALUES (
  5004,
  'Keeping Things Tidy',
  'habit_building',
  'Developing responsibility through small chores.',
  '# Keeping Things Tidy

## Tidy Up Time  
A clean space helps us focus.

## Make it Easy  
- Use bins  
- Label shelves  
- One toy in, one toy out

## Set a Timer  
Turn it into a game!

![](frontend/src/assets/images/placeholder_parent_stories.png)

## Be a Role Model  
Kids follow what adults do.

![](frontend/src/assets/images/placeholder_parent_stories.png)
',
  'Leo Martinez',
  NOW(),
  NULL,
  NULL
);
