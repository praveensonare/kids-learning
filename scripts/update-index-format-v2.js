const fs = require('fs');
const path = require('path');

const knowledgeBasePath = path.join(__dirname, '..', 'knowledgebase');

// Comprehensive curriculum-aligned content for all subjects
const curriculumContent = {
  // NURSERY
  nursery_literacy: {
    title: 'Nursery Literacy - Cambridge Primary Curriculum',
    objectives: [
      'Recognize and name all letters of the alphabet',
      'Understand that letters represent sounds',
      'Develop phonological awareness through rhymes and songs',
      'Handle books correctly and understand print concepts',
      'Begin to form recognizable letters',
      'Listen to and enjoy stories',
      'Develop speaking and listening skills'
    ],
    chapters: [
      {
        no: 1,
        name: 'Alphabet Adventure',
        description: 'Letter recognition, Uppercase letters, Lowercase letters, Letter names, Letter sounds, Alphabet song, Letter formation basics'
      },
      {
        no: 2,
        name: 'Sound Explorers',
        description: 'Phonemic awareness, Initial sounds, Rhyming words, Syllable counting, Sound discrimination, Oral blending, Sound games'
      },
      {
        no: 3,
        name: 'Story Time Magic',
        description: 'Listening comprehension, Story sequencing, Character identification, Picture reading, Story retelling, Predicting events, Story enjoyment'
      },
      {
        no: 4,
        name: 'Writing Readiness',
        description: 'Pre-writing skills, Fine motor development, Pencil grip, Pattern making, Shape drawing, Mark making, Letter tracing'
      }
    ]
  },

  nursery_numeracy: {
    title: 'Nursery Numeracy - Cambridge Primary Curriculum',
    objectives: [
      'Count reliably up to 10 and beyond',
      'Recognize and write numerals 0-10',
      'Understand one-to-one correspondence',
      'Compare quantities using mathematical language',
      'Recognize and describe 2D and 3D shapes',
      'Understand positional language',
      'Create and continue simple patterns'
    ],
    chapters: [
      {
        no: 1,
        name: 'Counting Adventures',
        description: 'Counting to 10, Number recognition, One-to-one correspondence, Counting objects, Number sequence, Counting songs, Number order'
      },
      {
        no: 2,
        name: 'Number Recognition',
        description: 'Numeral identification, Number formation, Writing numbers 0-10, Number names, Number matching, Number sorting, Number games'
      },
      {
        no: 3,
        name: 'Shape Explorers',
        description: 'Circle, Square, Triangle, Rectangle, 2D shapes, 3D shapes, Shape properties, Shape sorting, Shape patterns'
      },
      {
        no: 4,
        name: 'Patterns and Positions',
        description: 'Pattern creation, Pattern continuation, Positional language, Above and below, Inside and outside, Next to, Spatial awareness'
      }
    ]
  },

  nursery_science: {
    title: 'Nursery Science - Cambridge Primary Curriculum',
    objectives: [
      'Explore the natural world through observation',
      'Use senses to discover and investigate',
      'Understand basic needs of living things',
      'Observe changes in materials and objects',
      'Develop curiosity about how things work'
    ],
    chapters: [
      {
        no: 1,
        name: 'My Five Senses',
        description: 'Sight, Hearing, Touch, Taste, Smell, Sense exploration, Observation skills, Describing textures'
      },
      {
        no: 2,
        name: 'Plants and Animals',
        description: 'Living things, Animals, Plants, Growth, Basic needs, Habitats, Pet care, Wildlife observation'
      },
      {
        no: 3,
        name: 'Weather Watch',
        description: 'Weather types, Sunny, Rainy, Windy, Cloudy, Temperature, Seasonal changes, Weather observation'
      },
      {
        no: 4,
        name: 'Materials Around Us',
        description: 'Material properties, Hard and soft, Rough and smooth, Wet and dry, Material uses, Sorting materials, Exploring textures'
      }
    ]
  },

  // RECEPTION
  reception_english: {
    title: 'Reception English - Cambridge Primary Curriculum',
    objectives: [
      'Read and write phonetically plausible words',
      'Read common exception words',
      'Write simple sentences',
      'Develop comprehension skills',
      'Understand story structure'
    ],
    chapters: [
      {
        no: 1,
        name: 'Phonics Foundations',
        description: 'Letter sounds, Blending, Segmenting, CVC words, Consonant digraphs, Vowel digraphs, Initial sounds, Final sounds'
      },
      {
        no: 2,
        name: 'Reading Adventures',
        description: 'Decoding words, Sight words, Reading fluency, High-frequency words, Simple sentences, Picture clues, Reading comprehension'
      },
      {
        no: 3,
        name: 'Writing Journey',
        description: 'Sentence writing, Capital letters, Full stops, Finger spaces, Letter formation, Handwriting, Simple punctuation'
      },
      {
        no: 4,
        name: 'Story Comprehension',
        description: 'Understanding stories, Character recognition, Story settings, Beginning middle end, Predictions, Retelling stories, Story sequencing'
      }
    ]
  },

  reception_maths: {
    title: 'Reception Mathematics - Cambridge Primary Curriculum',
    objectives: [
      'Count and order numbers to 20',
      'Add and subtract within 10',
      'Understand number bonds',
      'Recognize and create patterns',
      'Describe 2D and 3D shapes'
    ],
    chapters: [
      {
        no: 1,
        name: 'Numbers to 20',
        description: 'Counting to 20, Number order, More and less, Number bonds, Estimation, Number line, Ordinal numbers'
      },
      {
        no: 2,
        name: 'Addition and Subtraction',
        description: 'Adding within 10, Subtracting within 10, Number bonds to 10, Combining groups, Taking away, Simple word problems'
      },
      {
        no: 3,
        name: 'Shape and Space',
        description: '2D shape names, 3D shape names, Shape properties, Patterns, Symmetry, Position, Direction'
      },
      {
        no: 4,
        name: 'Measurement Basics',
        description: 'Length comparison, Height comparison, Weight comparison, Capacity comparison, Time vocabulary, Money recognition, Non-standard units'
      }
    ]
  },

  reception_science: {
    title: 'Reception Science - Cambridge Primary Curriculum',
    objectives: [
      'Observe and describe the natural world',
      'Understand life cycles',
      'Explore materials and their properties',
      'Investigate forces and movement',
      'Learn about seasonal changes'
    ],
    chapters: [
      {
        no: 1,
        name: 'Living Things',
        description: 'Animals, Plants, Life cycles, Growth, Baby animals, Plant parts, Animal homes, Living vs non-living'
      },
      {
        no: 2,
        name: 'Material Detectives',
        description: 'Wood, Plastic, Metal, Fabric, Glass, Material properties, Waterproof, Absorbent, Material uses'
      },
      {
        no: 3,
        name: 'Seasons and Weather',
        description: 'Spring, Summer, Autumn, Winter, Seasonal changes, Weather patterns, Seasonal activities, Seasonal clothing'
      },
      {
        no: 4,
        name: 'Push and Pull',
        description: 'Forces, Pushing, Pulling, Movement, Speed, Direction, Stopping, Force in action'
      }
    ]
  },

  // YEAR 1
  year1_english: {
    title: 'Year 1 English - Cambridge Primary Curriculum',
    objectives: [
      'Apply phonic knowledge to decode words',
      'Read common exception words',
      'Write sentences with proper punctuation',
      'Use suffixes and prefixes',
      'Develop reading comprehension'
    ],
    chapters: [
      {
        no: 1,
        name: 'Advanced Phonics',
        description: 'Phase 5 phonics, Alternative spellings, Split digraphs, Trigraphs, Long vowel sounds, Consonant blends, Decoding strategies'
      },
      {
        no: 2,
        name: 'Reading Skills',
        description: 'Reading fluency, Expression, Comprehension strategies, Prediction, Inference, Story elements, Reading for meaning'
      },
      {
        no: 3,
        name: 'Sentence Construction',
        description: 'Sentence structure, Capital letters, Full stops, Question marks, Exclamation marks, Conjunctions (and), Simple sentences'
      },
      {
        no: 4,
        name: 'Word Building',
        description: 'Prefixes, Suffixes -ed -ing -s, Plurals, Past tense, Present tense, Word families, Compound words'
      }
    ]
  },

  year1_maths: {
    title: 'Year 1 Mathematics - Cambridge Primary Curriculum',
    objectives: [
      'Count to 100 and beyond',
      'Add and subtract within 20',
      'Understand place value',
      'Measure and compare',
      'Work with fractions'
    ],
    chapters: [
      {
        no: 1,
        name: 'Place Value',
        description: 'Numbers to 100, Tens and ones, Place value, Comparing numbers, Ordering numbers, Number patterns, Number line to 100'
      },
      {
        no: 2,
        name: 'Addition and Subtraction',
        description: 'Adding within 20, Subtracting within 20, Number bonds to 20, Mental strategies, Word problems, Missing numbers'
      },
      {
        no: 3,
        name: 'Multiplication Introduction',
        description: 'Equal groups, Arrays, Counting in 2s, Counting in 5s, Counting in 10s, Doubling, Halving'
      },
      {
        no: 4,
        name: 'Fractions and Measurement',
        description: 'Half, Quarter, Length, Height, Weight, Capacity, Time (o\'clock and half past), Money'
      }
    ]
  },

  year1_science: {
    title: 'Year 1 Science - Cambridge Primary Curriculum',
    objectives: [
      'Classify common animals',
      'Identify plants and their parts',
      'Distinguish materials by properties',
      'Understand seasonal changes',
      'Explore light and sound'
    ],
    chapters: [
      {
        no: 1,
        name: 'Animals Including Humans',
        description: 'Animal classification, Mammals, Birds, Fish, Reptiles, Amphibians, Human body parts, Animal diets, Senses'
      },
      {
        no: 2,
        name: 'Plants',
        description: 'Plant parts, Roots, Stem, Leaves, Flowers, Common plants, Garden plants, Wild plants, Trees, Plant growth'
      },
      {
        no: 3,
        name: 'Everyday Materials',
        description: 'Material names, Wood, Plastic, Glass, Metal, Water, Rock, Material properties, Material uses, Describing materials'
      },
      {
        no: 4,
        name: 'Seasonal Changes',
        description: 'Four seasons, Weather across seasons, Day length, Temperature changes, Seasonal observations, Seasonal activities'
      }
    ]
  },

  year1_art: {
    title: 'Year 1 Art - Cambridge Primary Curriculum',
    objectives: [
      'Use a range of materials creatively',
      'Develop drawing and painting techniques',
      'Explore color mixing',
      'Learn about famous artists',
      'Create sculptures'
    ],
    chapters: [
      {
        no: 1,
        name: 'Drawing Skills',
        description: 'Line drawing, Shape drawing, Patterns, Observational drawing, Pencil control, Crayon techniques, Mark making'
      },
      {
        no: 2,
        name: 'Painting Techniques',
        description: 'Brushwork, Primary colors, Secondary colors, Color mixing, Painting textures, Wash techniques, Paint control'
      },
      {
        no: 3,
        name: 'Sculpture and 3D',
        description: 'Modeling, Clay work, Construction, 3D forms, Joining techniques, Sculpting tools, Creative building'
      },
      {
        no: 4,
        name: 'Artists and Inspiration',
        description: 'Famous artists, Art styles, Observing artwork, Responding to art, Art appreciation, Artistic techniques, Creative expression'
      }
    ]
  },

  // YEAR 2
  year2_english: {
    title: 'Year 2 English - Cambridge Primary Curriculum',
    objectives: [
      'Read accurately and fluently',
      'Write narratives and non-fiction',
      'Use correct punctuation consistently',
      'Spell common words correctly',
      'Develop vocabulary'
    ],
    chapters: [
      {
        no: 1,
        name: 'Reading Comprehension',
        description: 'Inference, Prediction, Retrieval, Vocabulary development, Summarizing, Main ideas, Text types'
      },
      {
        no: 2,
        name: 'Narrative Writing',
        description: 'Story writing, Character development, Settings, Plot, Past tense, Descriptive language, Story structure'
      },
      {
        no: 3,
        name: 'Punctuation and Grammar',
        description: 'Commas in lists, Apostrophes for contraction, Question marks, Exclamation marks, Statements, Commands, Expanded noun phrases'
      },
      {
        no: 4,
        name: 'Spelling Patterns',
        description: 'Spelling rules, Homophones, Contractions, Common exception words, Suffixes, Prefixes, Spell patterns'
      }
    ]
  },

  year2_maths: {
    title: 'Year 2 Mathematics - Cambridge Primary Curriculum',
    objectives: [
      'Count in steps of 2, 3, 5, and 10',
      'Add and subtract two-digit numbers',
      'Learn multiplication and division',
      'Work with fractions',
      'Measure accurately'
    ],
    chapters: [
      {
        no: 1,
        name: 'Place Value to 100',
        description: 'Tens and ones, Comparing numbers, Ordering numbers, Number patterns, Partitioning, Rounding, Counting in steps'
      },
      {
        no: 2,
        name: 'Four Operations',
        description: 'Addition, Subtraction, Multiplication, Division, Times tables (2, 5, 10), Word problems, Inverse operations'
      },
      {
        no: 3,
        name: 'Fractions',
        description: 'Halves, Quarters, Thirds, Equal parts, Fractions of shapes, Fractions of amounts, Comparing fractions'
      },
      {
        no: 4,
        name: 'Measurement',
        description: 'Length (cm, m), Mass (g, kg), Temperature (°C), Capacity (ml, l), Time (hours, minutes), Money (pounds, pence)'
      }
    ]
  },

  year2_science: {
    title: 'Year 2 Science - Cambridge Primary Curriculum',
    objectives: [
      'Understand animal habitats and food chains',
      'Explore plant growth',
      'Investigate materials and their uses',
      'Learn about healthy living',
      'Discover forces and motion'
    ],
    chapters: [
      {
        no: 1,
        name: 'Living Things and Habitats',
        description: 'Habitats, Microhabitats, Food chains, Living things, Dead things, Never alive, Habitat conditions'
      },
      {
        no: 2,
        name: 'Plants',
        description: 'Seeds, Bulbs, Plant growth, Water requirements, Light requirements, Temperature, Germination'
      },
      {
        no: 3,
        name: 'Uses of Materials',
        description: 'Material suitability, Material properties, Changing shapes, Squashing, Bending, Twisting, Stretching'
      },
      {
        no: 4,
        name: 'Healthy Living',
        description: 'Exercise importance, Nutrition, Hygiene, Growth, Human needs, Healthy choices, Food groups'
      }
    ]
  },

  year2_art: {
    title: 'Year 2 Art - Cambridge Primary Curriculum',
    objectives: [
      'Develop techniques in drawing, painting and sculpture',
      'Learn about great artists and designers',
      'Use sketch books to record observations',
      'Mix and use a range of colors'
    ],
    chapters: [
      {
        no: 1,
        name: 'Drawing and Mark Making',
        description: 'Sketching, Shading, Texture, Tone, Detail, Observational skills, Drawing techniques'
      },
      {
        no: 2,
        name: 'Color Theory',
        description: 'Color wheel, Warm colors, Cool colors, Tints, Shades, Color harmony, Color mood'
      },
      {
        no: 3,
        name: 'Print Making',
        description: 'Printing techniques, Patterns, Repeated patterns, Stamps, Textures, Block printing, Press printing'
      },
      {
        no: 4,
        name: 'Famous Artists',
        description: 'Monet, Van Gogh, Art movements, Impressionism, Artist styles, Art appreciation, Artistic influence'
      }
    ]
  },

  // YEAR 3
  year3_english: {
    title: 'Year 3 English - Cambridge Primary Curriculum',
    objectives: [
      'Read a wide range of books',
      'Write structured narratives and non-fiction',
      'Use paragraphs to organize ideas',
      'Apply spelling rules',
      'Understand word classes'
    ],
    chapters: [
      {
        no: 1,
        name: 'Reading for Meaning',
        description: 'Comprehension skills, Inference, Author\'s intent, Themes, Literary language, Text analysis, Reading fluency'
      },
      {
        no: 2,
        name: 'Writing Stories',
        description: 'Narrative structure, Paragraphs, Dialogue, Description, Character development, Plot development, Story openings'
      },
      {
        no: 3,
        name: 'Grammar and Punctuation',
        description: 'Nouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, Sentence types, Punctuation rules'
      },
      {
        no: 4,
        name: 'Non-Fiction Writing',
        description: 'Information texts, Instructions, Explanations, Reports, Text organization, Headings, Subheadings'
      }
    ]
  },

  year3_maths: {
    title: 'Year 3 Mathematics - Cambridge Primary Curriculum',
    objectives: [
      'Understand place value to 1000',
      'Master times tables',
      'Work with fractions',
      'Measure and calculate',
      'Understand angles and shapes'
    ],
    chapters: [
      {
        no: 1,
        name: 'Place Value',
        description: 'Hundreds tens ones, Numbers to 1000, Comparing numbers, Rounding, Place value partitioning, Ordering numbers'
      },
      {
        no: 2,
        name: 'Multiplication and Division',
        description: 'Times tables (3, 4, 8), Mental strategies, Written methods, Division, Factor pairs, Multiplication facts'
      },
      {
        no: 3,
        name: 'Fractions',
        description: 'Unit fractions, Non-unit fractions, Equivalent fractions, Comparing fractions, Fractions on number line, Adding fractions'
      },
      {
        no: 4,
        name: 'Geometry and Measurement',
        description: 'Angles, Right angles, Perpendicular, Parallel, Perimeter, 2D shapes, 3D shapes'
      }
    ]
  },

  year3_science: {
    title: 'Year 3 Science - Cambridge Primary Curriculum',
    objectives: [
      'Compare and group rocks',
      'Understand nutrition and skeletons',
      'Explore forces and magnets',
      'Investigate light and shadows',
      'Study plants'
    ],
    chapters: [
      {
        no: 1,
        name: 'Rocks and Soils',
        description: 'Rock types, Igneous, Sedimentary, Metamorphic, Fossils, Soil formation, Permeability, Rock properties'
      },
      {
        no: 2,
        name: 'Animals and Humans',
        description: 'Nutrition, Skeleton, Muscles, Bones, Joints, Balanced diet, Food groups, Movement'
      },
      {
        no: 3,
        name: 'Forces and Magnets',
        description: 'Push and pull, Friction, Magnetic materials, Poles, Attract, Repel, Magnetic force'
      },
      {
        no: 4,
        name: 'Light and Shadow',
        description: 'Light sources, Reflection, Mirrors, Shadows, Shadow formation, Sun safety, Light and dark'
      }
    ]
  },

  year3_geography: {
    title: 'Year 3 Geography - Cambridge Primary Curriculum',
    objectives: [
      'Use maps and atlases',
      'Understand physical geography',
      'Compare locations',
      'Learn about different climates',
      'Study settlements'
    ],
    chapters: [
      {
        no: 1,
        name: 'Maps and Directions',
        description: 'Compass directions, North South East West, Map symbols, Map keys, Grid references, Map skills'
      },
      {
        no: 2,
        name: 'Rivers and Mountains',
        description: 'Rivers, Mountains, Valleys, River source, River mouth, Water cycle, Landforms'
      },
      {
        no: 3,
        name: 'Climate Zones',
        description: 'Equator, Tropics, Poles, Climate, Temperature, Rainfall, Climate zones, Weather patterns'
      },
      {
        no: 4,
        name: 'Settlements',
        description: 'Villages, Towns, Cities, Land use, Human geography, Settlement types, Urban and rural'
      }
    ]
  },

  year3_history: {
    title: 'Year 3 History - Cambridge Primary Curriculum',
    objectives: [
      'Study Stone Age to Iron Age',
      'Learn about Ancient Egypt',
      'Understand chronology',
      'Investigate historical sources',
      'Compare past and present'
    ],
    chapters: [
      {
        no: 1,
        name: 'Stone Age Britain',
        description: 'Hunter gatherers, Stone tools, Skara Brae, Prehistoric life, Cave art, Early humans'
      },
      {
        no: 2,
        name: 'Bronze and Iron Ages',
        description: 'Bronze Age, Iron Age, Hillforts, Farming development, Technology advancement, Celtic culture'
      },
      {
        no: 3,
        name: 'Ancient Egypt',
        description: 'Pharaohs, Pyramids, Mummies, River Nile, Hieroglyphics, Egyptian civilization, Daily life'
      },
      {
        no: 4,
        name: 'Using Historical Evidence',
        description: 'Primary sources, Artifacts, Archaeology, Timelines, Chronology, Historical interpretation'
      }
    ]
  },

  // Continue with Year 4-6...
  year4_english: {
    title: 'Year 4 English - Cambridge Primary Curriculum',
    objectives: [
      'Read and discuss a range of texts',
      'Write with clear structure and detail',
      'Use advanced punctuation',
      'Expand vocabulary',
      'Understand grammar rules'
    ],
    chapters: [
      {
        no: 1,
        name: 'Advanced Reading',
        description: 'Text analysis, Evaluating texts, Comparing texts, Themes, Language features, Reading strategies'
      },
      {
        no: 2,
        name: 'Creative Writing',
        description: 'Descriptive writing, Settings, Characters, Suspense, Poetry, Narrative techniques, Imagery'
      },
      {
        no: 3,
        name: 'Advanced Grammar',
        description: 'Fronted adverbials, Pronouns, Determiners, Clauses, Expanded noun phrases, Sentence structure'
      },
      {
        no: 4,
        name: 'Punctuation Mastery',
        description: 'Inverted commas, Apostrophes for possession, Commas in lists, Direct speech, Punctuation accuracy'
      }
    ]
  },

  year4_maths: {
    title: 'Year 4 Mathematics - Cambridge Primary Curriculum',
    objectives: [
      'Work with place value to 10000',
      'Master multiplication and division',
      'Understand decimals',
      'Calculate area and perimeter',
      'Work with coordinates'
    ],
    chapters: [
      {
        no: 1,
        name: 'Place Value to 10000',
        description: 'Thousands hundreds tens ones, Rounding, Roman numerals, Place value understanding, Number comparison'
      },
      {
        no: 2,
        name: 'Times Tables and Division',
        description: 'Times tables (6, 7, 9, 11, 12), Factor pairs, Division facts, Written methods, Multiplication strategies'
      },
      {
        no: 3,
        name: 'Fractions and Decimals',
        description: 'Equivalent fractions, Decimals, Tenths, Hundredths, Fraction problems, Decimal notation'
      },
      {
        no: 4,
        name: 'Area and Perimeter',
        description: 'Area calculation, Perimeter calculation, Rectangles, Rectilinear shapes, Coordinates, Grid positions'
      }
    ]
  },

  year4_science: {
    title: 'Year 4 Science - Cambridge Primary Curriculum',
    objectives: [
      'Classify living things',
      'Understand digestive system',
      'Study states of matter',
      'Explore electricity',
      'Learn about sound'
    ],
    chapters: [
      {
        no: 1,
        name: 'Living Things',
        description: 'Classification, Vertebrates, Invertebrates, Habitats, Food chains, Environments, Classification keys'
      },
      {
        no: 2,
        name: 'Digestion',
        description: 'Digestive system, Teeth, Food chains, Producers, Consumers, Decomposers, Nutrition'
      },
      {
        no: 3,
        name: 'States of Matter',
        description: 'Solids liquids gases, Changes of state, Evaporation, Condensation, Water cycle, Particles'
      },
      {
        no: 4,
        name: 'Electricity and Sound',
        description: 'Circuits, Conductors, Insulators, Vibrations, Pitch, Volume, Sound waves'
      }
    ]
  },

  year4_geography: {
    title: 'Year 4 Geography - Cambridge Primary Curriculum',
    objectives: [
      'Locate world countries',
      'Study European geography',
      'Understand earthquakes and volcanoes',
      'Learn about water cycle',
      'Study economic activity'
    ],
    chapters: [
      {
        no: 1,
        name: 'Europe and Beyond',
        description: 'Continents, Countries, Capital cities, European Union, Flags, European geography'
      },
      {
        no: 2,
        name: 'Mountains and Volcanoes',
        description: 'Volcanoes, Earthquakes, Tectonic plates, Ring of Fire, Mountain ranges, Volcanic activity'
      },
      {
        no: 3,
        name: 'Water Cycle',
        description: 'Evaporation, Condensation, Precipitation, Collection, Rivers, Water movement'
      },
      {
        no: 4,
        name: 'Trade and Resources',
        description: 'Natural resources, Trade, Import, Export, Fair trade, Economic geography'
      }
    ]
  },

  year4_history: {
    title: 'Year 4 History - Cambridge Primary Curriculum',
    objectives: [
      'Study Romans in Britain',
      'Learn about Anglo-Saxons',
      'Understand Viking invasions',
      'Compare historical periods',
      'Use historical sources'
    ],
    chapters: [
      {
        no: 1,
        name: 'Roman Empire',
        description: 'Julius Caesar, Roman army, Roman roads, Roman baths, Roman villas, Hadrian\'s Wall'
      },
      {
        no: 2,
        name: 'Anglo-Saxons',
        description: 'Saxon settlements, Anglo-Saxon kingdoms, Sutton Hoo, Anglo-Saxon culture, Daily life'
      },
      {
        no: 3,
        name: 'Vikings',
        description: 'Longships, Viking raids, Danelaw, Norse gods, Viking life, Viking influence'
      },
      {
        no: 4,
        name: 'Historical Impact',
        description: 'Legacy, Influence, Comparing periods, Change and continuity, Historical significance'
      }
    ]
  },

  // YEAR 5
  year5_english: {
    title: 'Year 5 English - Cambridge Primary Curriculum',
    objectives: [
      'Analyze complex texts',
      'Write for different purposes',
      'Master advanced grammar',
      'Use figurative language',
      'Develop critical reading'
    ],
    chapters: [
      {
        no: 1,
        name: 'Literary Analysis',
        description: 'Metaphor, Simile, Personification, Analyzing language, Author\'s purpose, Literary devices'
      },
      {
        no: 2,
        name: 'Persuasive Writing',
        description: 'Persuasion techniques, Arguments, Evidence, Rhetorical questions, Balanced arguments, Persuasive devices'
      },
      {
        no: 3,
        name: 'Complex Grammar',
        description: 'Relative clauses, Modal verbs, Passive voice, Subjunctive form, Cohesion, Complex sentences'
      },
      {
        no: 4,
        name: 'Poetry and Performance',
        description: 'Poetry forms, Rhythm, Meter, Performance techniques, Interpretation, Poetic devices'
      }
    ]
  },

  year5_maths: {
    title: 'Year 5 Mathematics - Cambridge Primary Curriculum',
    objectives: [
      'Work with numbers to 1000000',
      'Master four operations with larger numbers',
      'Understand fractions, decimals and percentages',
      'Calculate with measures',
      'Study properties of shapes'
    ],
    chapters: [
      {
        no: 1,
        name: 'Large Numbers',
        description: 'Place value to million, Negative numbers, Rounding, Roman numerals, Number operations'
      },
      {
        no: 2,
        name: 'Four Operations',
        description: 'Written methods, Long multiplication, Long division, Order of operations, Mental calculations'
      },
      {
        no: 3,
        name: 'Fractions and Percentages',
        description: 'Equivalent fractions, Improper fractions, Decimals, Percentages, Converting, Fraction calculations'
      },
      {
        no: 4,
        name: 'Shape and Measure',
        description: 'Area, Perimeter, Volume, Angles, Reflection, Translation, Shape properties'
      }
    ]
  },

  year5_science: {
    title: 'Year 5 Science - Cambridge Primary Curriculum',
    objectives: [
      'Understand properties and changes of materials',
      'Study Earth and space',
      'Learn about forces',
      'Explore life cycles',
      'Investigate reversible changes'
    ],
    chapters: [
      {
        no: 1,
        name: 'Materials and Properties',
        description: 'Dissolving, Separating mixtures, Reversible changes, Irreversible changes, Material properties'
      },
      {
        no: 2,
        name: 'Earth and Space',
        description: 'Solar system, Planets, Earth rotation, Day and night, Seasons, Moon phases'
      },
      {
        no: 3,
        name: 'Forces',
        description: 'Gravity, Air resistance, Water resistance, Friction, Mechanisms, Levers, Pulleys'
      },
      {
        no: 4,
        name: 'Life Cycles',
        description: 'Reproduction, Mammal life cycles, Amphibian life cycles, Insect life cycles, Bird life cycles, Plant life cycles'
      }
    ]
  },

  year5_geography: {
    title: 'Year 5 Geography - Cambridge Primary Curriculum',
    objectives: [
      'Study North and South America',
      'Understand biomes',
      'Learn about climate change',
      'Study rivers in detail',
      'Understand human geography'
    ],
    chapters: [
      {
        no: 1,
        name: 'Americas',
        description: 'North America, South America, Countries, Physical features, Cities, American geography'
      },
      {
        no: 2,
        name: 'Biomes and Climate',
        description: 'Rainforest, Desert, Tundra, Grassland, Climate zones, Ecosystems'
      },
      {
        no: 3,
        name: 'Rivers',
        description: 'River features, Erosion, Deposition, Flood plains, Deltas, Meanders'
      },
      {
        no: 4,
        name: 'Climate Change',
        description: 'Global warming, Greenhouse gases, Sustainability, Renewable energy, Environmental impact'
      }
    ]
  },

  year5_history: {
    title: 'Year 5 History - Cambridge Primary Curriculum',
    objectives: [
      'Study Ancient Greece',
      'Learn about Greek legacy',
      'Understand democracy',
      'Study Greek mythology',
      'Compare ancient civilizations'
    ],
    chapters: [
      {
        no: 1,
        name: 'Ancient Greek Civilization',
        description: 'Athens, Sparta, City-states, Greek society, Daily life, Ancient Greece'
      },
      {
        no: 2,
        name: 'Greek Democracy',
        description: 'Democracy, Government, Citizenship, Voting, Assembly, Political systems'
      },
      {
        no: 3,
        name: 'Greek Culture',
        description: 'Olympics, Theater, Philosophy, Architecture, Art, Greek achievements'
      },
      {
        no: 4,
        name: 'Greek Legacy',
        description: 'Influence on modern world, Alphabet, Mathematics, Science, Cultural legacy'
      }
    ]
  },

  // YEAR 6
  year6_english: {
    title: 'Year 6 English - Cambridge Primary Curriculum',
    objectives: [
      'Master reading comprehension',
      'Write confidently for different audiences',
      'Apply advanced grammar accurately',
      'Use sophisticated vocabulary',
      'Evaluate texts critically'
    ],
    chapters: [
      {
        no: 1,
        name: 'Critical Reading',
        description: 'Evaluation, Comparing texts, Implicit meaning, Bias, Perspective, Critical analysis'
      },
      {
        no: 2,
        name: 'Advanced Writing',
        description: 'Formal writing, Informal writing, Voice, Audience, Purpose, Writing styles'
      },
      {
        no: 3,
        name: 'Grammar Mastery',
        description: 'Subjunctive, Passive voice, Perfect tense, Colons, Semicolons, Dashes, Advanced grammar'
      },
      {
        no: 4,
        name: 'SATs Preparation',
        description: 'Exam techniques, Comprehension strategies, Spelling rules, Revision strategies, Test practice'
      }
    ]
  },

  year6_maths: {
    title: 'Year 6 Mathematics - Cambridge Primary Curriculum',
    objectives: [
      'Work with numbers to 10000000',
      'Master all four operations',
      'Work fluently with fractions, decimals and percentages',
      'Solve complex problems',
      'Apply mathematical reasoning'
    ],
    chapters: [
      {
        no: 1,
        name: 'Number and Place Value',
        description: 'Ten million, Negative numbers, Rounding, Estimation, Complex calculations'
      },
      {
        no: 2,
        name: 'Calculation Mastery',
        description: 'Four operations, Order of operations, Mental strategies, Problem solving, Written methods'
      },
      {
        no: 3,
        name: 'FDP and Ratio',
        description: 'Fractions decimals percentages, Ratio, Proportion, Algebra introduction, Relationships'
      },
      {
        no: 4,
        name: 'Geometry and Statistics',
        description: 'Circles, Area, Volume, Mean average, Graphs, Pie charts, Data handling'
      }
    ]
  },

  year6_science: {
    title: 'Year 6 Science - Cambridge Primary Curriculum',
    objectives: [
      'Classify living things',
      'Understand human circulatory system',
      'Study evolution and inheritance',
      'Learn about light',
      'Explore electricity in depth'
    ],
    chapters: [
      {
        no: 1,
        name: 'Classification',
        description: 'Micro-organisms, Carl Linnaeus, Classification systems, Kingdoms, Classification keys'
      },
      {
        no: 2,
        name: 'Circulation and Health',
        description: 'Heart, Blood vessels, Circulatory system, Healthy lifestyle, Diet, Exercise'
      },
      {
        no: 3,
        name: 'Evolution and Inheritance',
        description: 'Adaptation, Evolution, Inheritance, Fossils, Charles Darwin, Natural selection'
      },
      {
        no: 4,
        name: 'Light and Electricity',
        description: 'Light travels, Shadows, Reflection, Circuits, Circuit symbols, Voltage'
      }
    ]
  },

  year6_geography: {
    title: 'Year 6 Geography - Cambridge Primary Curriculum',
    objectives: [
      'Study world regions in depth',
      'Understand economic geography',
      'Learn about migration',
      'Study environmental issues',
      'Use advanced map skills'
    ],
    chapters: [
      {
        no: 1,
        name: 'Global Regions',
        description: 'Asia, Africa, Latitude, Longitude, Time zones, Hemispheres'
      },
      {
        no: 2,
        name: 'Economic Geography',
        description: 'Trade, Industry, Agriculture, Tourism, Economic development'
      },
      {
        no: 3,
        name: 'Environmental Issues',
        description: 'Deforestation, Pollution, Conservation, Endangered species, Sustainability'
      },
      {
        no: 4,
        name: 'Migration and Settlement',
        description: 'Population, Migration, Urban areas, Rural areas, Push factors, Pull factors'
      }
    ]
  },

  year6_history: {
    title: 'Year 6 History - Cambridge Primary Curriculum',
    objectives: [
      'Study Victorian Britain',
      'Learn about World Wars',
      'Understand social change',
      'Study British Empire',
      'Develop historical perspective'
    ],
    chapters: [
      {
        no: 1,
        name: 'Victorian Era',
        description: 'Queen Victoria, Industrial Revolution, Railways, Factories, Social reform, Victorian life'
      },
      {
        no: 2,
        name: 'British Empire',
        description: 'Empire, Colonies, Trade, Exploration, Imperial legacy, Global influence'
      },
      {
        no: 3,
        name: 'World Wars',
        description: 'WW1, WW2, Trenches, The Blitz, Evacuation, Home front, War impact'
      },
      {
        no: 4,
        name: 'Modern Britain',
        description: 'Post-war Britain, Immigration, Social change, Technology, 20th century development'
      }
    ]
  }
};

// Generate index file in new format
function generateNewIndexFile(subjectKey, data) {
  let content = `${data.title}\n\n`;

  content += 'Learning Objectives:\n';
  data.objectives.forEach(obj => {
    content += `- ${obj}\n`;
  });

  content += '\nChapters:\n\n';
  data.chapters.forEach(chapter => {
    content += `chapter no: ${chapter.no}\n`;
    content += `name: ${chapter.name}\n`;
    content += `description: ${chapter.description}\n\n`;
  });

  return content;
}

// Update all index files
console.log('Updating all index files to new format...\n');

let filesUpdated = 0;

Object.keys(curriculumContent).forEach(subjectKey => {
  const data = curriculumContent[subjectKey];
  const indexPath = path.join(knowledgeBasePath, `${subjectKey}.txt`);

  const indexContent = generateNewIndexFile(subjectKey, data);
  fs.writeFileSync(indexPath, indexContent);

  console.log(`✓ Updated ${subjectKey}.txt`);
  filesUpdated++;
});

console.log(`\n✅ Update complete! Updated ${filesUpdated} index files.`);
console.log('\nNew format:');
console.log('  chapter no: X');
console.log('  name: Chapter Name');
console.log('  description: topic1, topic2, topic3, ...\n');
