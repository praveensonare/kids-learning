const fs = require('fs');
const path = require('path');

const knowledgeBasePath = path.join(__dirname, '..', 'knowledgebase');

/**
 * COMPREHENSIVE CURRICULUM CONTENT GENERATOR
 * Data-driven approach using actual curriculum standards
 *
 * Sources:
 * - EYFS Framework (Early Years Foundation Stage)
 * - Cambridge Primary Mathematics 0096
 * - Cambridge Primary English 0058
 * - Cambridge Primary Science
 */

// ============================================================================
// NURSERY - EYFS Framework (Age 3-4)
// ============================================================================

const nurseryContent = {
  literacy: {
    title: 'Nursery Literacy - EYFS Framework',
    objectives: [
      'Develop phonological awareness',
      'Understand that print carries meaning',
      'Recognize letters and begin letter-sound correspondence',
      'Enjoy stories, songs and rhymes',
      'Begin mark-making and pre-writing skills'
    ],
    chapters: [
      {
        title: 'Alphabet Fun',
        topics: [
          {
            title: 'Letter Recognition A-M',
            content: {
              introduction: 'Learning the first half of the alphabet through multi-sensory activities.',
              activities: [
                'Sing alphabet songs focusing on A-M',
                'Trace large letters in sand, paint, or with fingers',
                'Match uppercase and lowercase letters',
                'Find letters in the environment (signs, books, labels)',
                'Create letter collages with objects starting with each letter'
              ],
              vocabulary: ['letter', 'alphabet', 'uppercase', 'lowercase', 'sound'],
              resources: ['Alphabet flashcards', 'Letter formation cards', 'Environmental print'],
              assessment: 'Can the child recognize and name letters A-M? Can they identify the initial sound?'
            }
          },
          {
            title: 'Letter Recognition N-Z',
            content: {
              introduction: 'Completing the alphabet with letters N-Z.',
              activities: [
                'Continue alphabet songs with N-Z',
                'Letter hunts - finding specific letters',
                'Sorting letters (straight lines vs curved)',
                'Building letters with playdough',
                'Letter sound games'
              ],
              vocabulary: ['complete alphabet', 'letter names', 'letter shapes', 'straight', 'curved'],
              resources: ['Letter blocks', 'Magnetic letters', 'Letter stamps'],
              assessment: 'Can recognize most letters of the alphabet? Beginning to associate sounds?'
            }
          },
          {
            title: 'Initial Sounds',
            content: {
              introduction: 'Understanding that words start with different sounds.',
              activities: [
                'I-Spy games with initial sounds',
                'Sound sorting activities',
                'Picture cards - matching initial sounds',
                'Rhyme time - finding words that sound similar',
                'Alliteration activities (e.g., "Silly Sally")'
              ],
              vocabulary: ['sound', 'begins with', 'starts with', 'rhyme', 'same sound'],
              resources: ['Picture cards', 'Sound boxes', 'Rhyming books'],
              assessment: 'Can identify initial sounds in familiar words?'
            }
          },
          {
            title: 'Print Awareness',
            content: {
              introduction: 'Understanding how books and print work.',
              activities: [
                'Book handling - showing correct orientation',
                'Following text with finger during shared reading',
                'Understanding that print carries meaning',
                'Recognizing own name in print',
                'Environmental print walks'
              ],
              vocabulary: ['book', 'story', 'front', 'back', 'page', 'words', 'read'],
              resources: ['Big books', 'Name cards', 'Labels around classroom'],
              assessment: 'Does child show understanding of how books work? Recognizes own name?'
            }
          }
        ]
      },
      {
        title: 'Fruits and Vegetables',
        topics: [
          {
            title: 'Common Fruits',
            content: {
              introduction: 'Learning about everyday fruits through sensory exploration.',
              activities: [
                'Fruit tasting sessions - apple, banana, orange, grapes, strawberry',
                'Sorting fruits by color, size, shape',
                'Fruit printing art activities',
                'Learning fruit names and initial sounds',
                'Healthy eating discussions'
              ],
              vocabulary: ['apple', 'banana', 'orange', 'grapes', 'strawberry', 'fruit', 'healthy', 'sweet', 'juicy'],
              resources: ['Real fruits', 'Plastic fruit models', 'Picture cards', 'Fruit books'],
              assessment: 'Can name 3-5 common fruits? Understands fruits are healthy foods?'
            }
          },
          {
            title: 'Common Vegetables',
            content: {
              introduction: 'Exploring vegetables and their importance.',
              activities: [
                'Vegetable tasting - carrot, cucumber, tomato, potato, broccoli',
                'Growing vegetables from seeds',
                'Vegetable printing and art',
                'Sorting by color - green vegetables, orange vegetables',
                'Cooking simple vegetable snacks'
              ],
              vocabulary: ['carrot', 'cucumber', 'tomato', 'potato', 'broccoli', 'vegetable', 'grow', 'healthy', 'crunchy'],
              resources: ['Real vegetables', 'Growing kits', 'Vegetable books', 'Picture cards'],
              assessment: 'Can name 3-5 vegetables? Shows willingness to try vegetables?'
            }
          },
          {
            title: 'Where Food Comes From',
            content: {
              introduction: 'Understanding that food grows and comes from different places.',
              activities: [
                'Learning about farms and gardens',
                'Sorting: grows on trees vs grows in ground',
                'Planting seeds and watching them grow',
                'Visiting a farm or market (virtual or real)',
                'Creating a classroom vegetable patch'
              ],
              vocabulary: ['grow', 'plant', 'seed', 'soil', 'water', 'farm', 'garden', 'tree', 'ground'],
              resources: ['Growing kits', 'Farm books', 'Pictures of farms and gardens'],
              assessment: 'Basic understanding that food comes from plants/farms?'
            }
          },
          {
            title: 'Healthy Eating',
            content: {
              introduction: 'Learning about eating fruits and vegetables for health.',
              activities: [
                'Creating healthy plate collages',
                'Sorting healthy vs treat foods',
                'Rainbow of fruits and vegetables activity',
                'Making fruit kebabs or veggie sticks',
                'Role-play grocery shopping for healthy foods'
              ],
              vocabulary: ['healthy', 'good for you', 'strong', 'grow', 'energy', 'rainbow', 'variety'],
              resources: ['Food picture cards', 'Play kitchen', 'Shopping basket'],
              assessment: 'Can identify some healthy foods? Beginning to understand healthy choices?'
            }
          }
        ]
      },
      {
        title: 'Vehicles and Transport',
        topics: [
          {
            title: 'Land Vehicles',
            content: {
              introduction: 'Exploring vehicles that travel on roads.',
              activities: [
                'Learning about car, bus, truck, bicycle, train, motorcycle',
                'Vehicle sound games',
                'Building vehicle models with blocks',
                'Vehicle sorting by size, number of wheels',
                'Creating roads and traffic scenarios'
              ],
              vocabulary: ['car', 'bus', 'truck', 'bicycle', 'train', 'motorcycle', 'wheels', 'road', 'driver', 'fast', 'slow'],
              resources: ['Toy vehicles', 'Vehicle books', 'Building blocks', 'Road play mats'],
              assessment: 'Can name 4-6 common vehicles? Understands they go on roads?'
            }
          },
          {
            title: 'Air and Water Vehicles',
            content: {
              introduction: 'Learning about vehicles that fly or float.',
              activities: [
                'Exploring airplane, helicopter, boat, ship concepts',
                'Making paper airplanes',
                'Water play with floating toy boats',
                'Learning vehicle sounds (plane engine, boat horn)',
                'Sky vs water vehicle sorting'
              ],
              vocabulary: ['airplane', 'helicopter', 'boat', 'ship', 'fly', 'float', 'sky', 'water', 'pilot', 'captain'],
              resources: ['Toy planes and boats', 'Water table', 'Pictures of vehicles'],
              assessment: 'Can identify vehicles that fly vs float? Names 2-3 air/water vehicles?'
            }
          },
          {
            title: 'Vehicle Parts and Functions',
            content: {
              introduction: 'Understanding how vehicles work and their parts.',
              activities: [
                'Identifying wheels, windows, doors, engines',
                'Counting wheels on different vehicles',
                'Learning vehicle purposes (ambulance helps sick people)',
                'Safety discussions (seat belts, helmets)',
                'Building vehicles from junk materials'
              ],
              vocabulary: ['wheels', 'engine', 'steering wheel', 'window', 'door', 'seat belt', 'helmet', 'safe'],
              resources: ['Vehicle models', 'Construction materials', 'Safety equipment props'],
              assessment: 'Can identify basic vehicle parts? Understanding of vehicle purposes?'
            }
          },
          {
            title: 'Road Safety',
            content: {
              introduction: 'Basic road safety awareness.',
              activities: [
                'Learning about traffic lights (red-stop, green-go)',
                'Pedestrian crossing practice',
                'Looking left and right before crossing',
                'Role-play being safe pedestrians',
                'Making traffic light crafts'
              ],
              vocabulary: ['stop', 'go', 'wait', 'safe', 'careful', 'look', 'listen', 'cross', 'traffic light', 'zebra crossing'],
              resources: ['Traffic light props', 'Road crossing mat', 'Hi-vis vests'],
              assessment: 'Shows awareness of basic road safety? Knows stop and go?'
            }
          }
        ]
      }
    ]
  },

  numeracy: {
    title: 'Nursery Numeracy - EYFS Framework',
    objectives: [
      'Develop counting skills to 10',
      'Recognize numerals 0-10',
      'Compare quantities using language more/less',
      'Understand one-to-one correspondence',
      'Begin to explore simple patterns'
    ],
    chapters: [
      {
        title: 'Numbers 1-5',
        topics: [
          {
            title: 'Counting to 5',
            content: {
              introduction: 'Learning to count objects reliably to 5.',
              activities: [
                'Counting fingers on one hand',
                'Counting objects in groups 1-5',
                'Singing number rhymes (5 little ducks, 5 currant buns)',
                'Touch-counting activities',
                'Number hunts - finding groups of 1, 2, 3, 4, 5'
              ],
              vocabulary: ['one', 'two', 'three', 'four', 'five', 'count', 'how many', 'number'],
              resources: ['Counting objects (blocks, buttons, toys)', 'Number rhyme props', 'Number cards 1-5'],
              assessment: 'Can count up to 5 objects accurately using one-to-one correspondence?'
            }
          },
          {
            title: 'Number Recognition 1-5',
            content: {
              introduction: 'Recognizing and matching numerals 1-5.',
              activities: [
                'Number matching games',
                'Finding numbers in environment',
                'Number formation practice (large scale)',
                'Matching numeral to quantity',
                'Number bingo with numbers 1-5'
              ],
              vocabulary: ['number', 'numeral', 'match', 'same', 'different'],
              resources: ['Number cards', 'Magnetic numbers', 'Number stamps', 'Playdough'],
              assessment: 'Can recognize numerals 1-5? Beginning to write them?'
            }
          },
          {
            title: 'One-to-One Correspondence',
            content: {
              introduction: 'Understanding that each object gets one count.',
              activities: [
                'Setting table - one plate per person',
                'Sharing objects - one each',
                'Counting with finger pointing',
                'Matching games',
                'Pairing activities (socks, gloves)'
              ],
              vocabulary: ['one each', 'same number', 'matching', 'pairs'],
              resources: ['Everyday objects', 'Counting collections', 'Matching cards'],
              assessment: 'Shows understanding of one-to-one correspondence when counting?'
            }
          },
          {
            title: 'Comparing Quantities to 5',
            content: {
              introduction: 'Using language to compare amounts.',
              activities: [
                'More and less games',
                'Comparing towers of blocks',
                'Which has more? activities',
                'Sorting by size',
                'Making equal groups'
              ],
              vocabulary: ['more', 'less', 'fewer', 'same', 'equal', 'bigger group', 'smaller group'],
              resources: ['Counting collections', 'Balance scales', 'Comparison cards'],
              assessment: 'Can use language of more/less/same to compare groups to 5?'
            }
          }
        ]
      },
      {
        title: 'Numbers 6-10',
        topics: [
          {
            title: 'Counting to 10',
            content: {
              introduction: 'Extending counting skills to 10.',
              activities: [
                'Counting fingers on both hands',
                'Counting larger groups of objects',
                'Number songs to 10',
                'Counting movements (jumps, claps)',
                'Counting backwards from 10'
              ],
              vocabulary: ['six', 'seven', 'eight', 'nine', 'ten', 'count on', 'count back'],
              resources: ['Ten frames', 'Counting objects', 'Number line 0-10'],
              assessment: 'Can count reliably to 10? Beginning to count backwards?'
            }
          },
          {
            title: 'Number Recognition 6-10',
            content: {
              introduction: 'Learning to recognize numerals 6-10.',
              activities: [
                'Number treasure hunts',
                'Ordering number cards 1-10',
                'Number matching to quantities',
                'Writing numbers in sand/paint',
                'Number games and puzzles'
              ],
              vocabulary: ['numeral', 'digit', 'order', 'sequence', 'before', 'after'],
              resources: ['Number cards 1-10', 'Number puzzles', 'Writing materials'],
              assessment: 'Can recognize most numerals to 10? Can order some numbers?'
            }
          },
          {
            title: 'Number Bonds to 5',
            content: {
              introduction: 'Exploring ways to make numbers to 5.',
              activities: [
                'Part-whole games (5 = 3 and 2)',
                'Ten frame activities',
                'Finding pairs that make 5',
                'Finger combinations for numbers',
                'Real-life splitting activities'
              ],
              vocabulary: ['makes', 'total', 'altogether', 'and', 'split', 'part'],
              resources: ['Ten frames', 'Counters', 'Part-whole cards'],
              assessment: 'Beginning to see numbers as composed of smaller numbers?'
            }
          },
          {
            title: 'Zero',
            content: {
              introduction: 'Understanding zero means nothing/none.',
              activities: [
                'Countdown activities to zero',
                'Empty set activities',
                'Zero in everyday life (no cookies left)',
                'Number line including zero',
                'Subtraction stories to zero'
              ],
              vocabulary: ['zero', 'none', 'nothing', 'empty', 'all gone'],
              resources: ['Number line with 0', 'Empty containers', 'Countdown props'],
              assessment: 'Understands zero represents nothing? Can identify numeral 0?'
            }
          }
        ]
      }
    ]
  }
};

// ============================================================================
// CONTENT GENERATION FUNCTIONS
// ============================================================================

function generateNurseryChapterFile(subject, chapterIndex, chapterData) {
  const subjectTitle = subject === 'literacy' ? 'Literacy' : 'Numeracy';
  let content = `Nursery ${subjectTitle} - Chapter ${chapterIndex + 1}: ${chapterData.title}\n\n`;

  chapterData.topics.forEach((topic, topicIndex) => {
    content += `TOPIC ${topicIndex + 1}: ${topic.title}\n\n`;

    const topicContent = topic.content;

    // Introduction
    content += `Introduction:\n${topicContent.introduction}\n\n`;

    // Activities
    content += `Activities:\n`;
    topicContent.activities.forEach((activity, i) => {
      content += `${i + 1}. ${activity}\n`;
    });
    content += `\n`;

    // Key Vocabulary
    content += `Key Vocabulary:\n`;
    content += topicContent.vocabulary.join(', ') + '\n\n';

    // Resources Needed
    content += `Resources Needed:\n`;
    topicContent.resources.forEach((resource, i) => {
      content += `- ${resource}\n`;
    });
    content += `\n`;

    // Assessment
    content += `Assessment Checkpoint:\n${topicContent.assessment}\n`;

    if (topicIndex < chapterData.topics.length - 1) {
      content += `\n---\n\n`;
    }
  });

  return content;
}

function generateIndexFile(classLevel, subject, subjectData) {
  let content = `${subjectData.title}\n\n`;

  content += `Learning Objectives:\n`;
  subjectData.objectives.forEach(obj => {
    content += `- ${obj}\n`;
  });

  content += `\nChapters:\n\n`;

  subjectData.chapters.forEach((chapter, index) => {
    content += `chapter no: ${index + 1}\n`;
    content += `name: ${chapter.title}\n`;

    // Extract topic titles as description
    const topicTitles = chapter.topics.map(t => t.title).join(', ');
    content += `description: ${topicTitles}\n\n`;
  });

  return content;
}

// ============================================================================
// MAIN GENERATION
// ============================================================================

console.log('🚀 Generating Comprehensive Curriculum Content...\n');
console.log('📚 Using EYFS Framework and Cambridge Primary Standards\n');

let filesGenerated = 0;

// Generate Nursery Content
for (const subject in nurseryContent) {
  const subjectData = nurseryContent[subject];
  const subjectKey = `nursery_${subject}`;

  console.log(`\n📖 Generating ${subjectKey}...`);

  // Generate index file
  const indexContent = generateIndexFile('nursery', subject, subjectData);
  const indexPath = path.join(knowledgeBasePath, `${subjectKey}.txt`);
  fs.writeFileSync(indexPath, indexContent);
  console.log(`  ✓ Index file created`);
  filesGenerated++;

  // Generate chapter files
  subjectData.chapters.forEach((chapter, chapterIndex) => {
    const chapterContent = generateNurseryChapterFile(subject, chapterIndex, chapter);
    const chapterPath = path.join(knowledgeBasePath, `${subjectKey}_chapter${chapterIndex + 1}.txt`);
    fs.writeFileSync(chapterPath, chapterContent);
    console.log(`  ✓ Chapter ${chapterIndex + 1}: ${chapter.title} (${chapter.topics.length} topics)`);
    filesGenerated++;
  });
}

console.log(`\n\n✅ Generation Complete!`);
console.log(`📊 Files created: ${filesGenerated}`);
console.log(`\n📋 Content Includes:`);
console.log(`   - Alphabet and letter sounds`);
console.log(`   - Fruits and vegetables`);
console.log(`   - Vehicles and transport`);
console.log(`   - Numbers 1-10`);
console.log(`   - Age-appropriate activities and assessments`);
console.log(`\n🎯 All content aligned with EYFS Framework`);

console.log(`\n\n💡 Next Steps:`);
console.log(`   1. Extend this pattern to Reception, Year 1-6`);
console.log(`   2. Add Cambridge Primary content for older years`);
console.log(`   3. Run index generator to update all index files`);
