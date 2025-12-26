const fs = require('fs');
const path = require('path');

const knowledgeBasePath = path.join(__dirname, '..', 'knowledgebase');

// Subject-specific chapter structures
const chapterStructures = {
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
      { number: 1, title: 'Alphabet Adventure', keywords: ['letters', 'uppercase', 'lowercase', 'recognition', 'sounds', 'phonics', 'alphabet song'] },
      { number: 2, title: 'Sound Explorers', keywords: ['phonics', 'initial sounds', 'rhyming', 'syllables', 'word families', 'sound games'] },
      { number: 3, title: 'Story Time Magic', keywords: ['comprehension', 'characters', 'sequence', 'prediction', 'retelling', 'story elements'] },
      { number: 4, title: 'Writing Readiness', keywords: ['pre-writing', 'fine motor', 'patterns', 'shapes', 'pencil grip', 'letter formation'] }
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
      { number: 1, title: 'Counting Adventures', keywords: ['counting', 'numbers 1-10', 'one-to-one', 'counting objects', 'number sequence'] },
      { number: 2, title: 'Number Recognition', keywords: ['numeral recognition', 'number formation', 'writing numbers', 'number names'] },
      { number: 3, title: 'Shape Explorers', keywords: ['2D shapes', '3D shapes', 'circle', 'square', 'triangle', 'rectangle', 'sphere', 'cube'] },
      { number: 4, title: 'Patterns and Positions', keywords: ['patterns', 'sequences', 'positional language', 'above', 'below', 'beside'] }
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
      { number: 1, title: 'My Five Senses', keywords: ['sight', 'hearing', 'touch', 'taste', 'smell', 'senses', 'observation'] },
      { number: 2, title: 'Plants and Animals', keywords: ['living things', 'plants', 'animals', 'growth', 'needs', 'habitats'] },
      { number: 3, title: 'Weather Watch', keywords: ['weather', 'seasons', 'sun', 'rain', 'wind', 'temperature', 'clouds'] },
      { number: 4, title: 'Materials Around Us', keywords: ['materials', 'properties', 'hard', 'soft', 'rough', 'smooth', 'textures'] }
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
      { number: 1, title: 'Phonics Foundations', keywords: ['phonics', 'letter sounds', 'blending', 'segmenting', 'CVC words', 'digraphs'] },
      { number: 2, title: 'Reading Adventures', keywords: ['reading', 'decoding', 'sight words', 'fluency', 'common exception words'] },
      { number: 3, title: 'Writing Journey', keywords: ['sentence writing', 'capital letters', 'full stops', 'finger spaces', 'handwriting'] },
      { number: 4, title: 'Story Comprehension', keywords: ['understanding', 'prediction', 'inference', 'retelling', 'story structure'] }
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
      { number: 1, title: 'Numbers to 20', keywords: ['counting', 'number order', 'more', 'less', 'estimation', 'number line'] },
      { number: 2, title: 'Addition and Subtraction', keywords: ['adding', 'subtracting', 'number bonds', 'within 10', 'strategies'] },
      { number: 3, title: 'Shape and Space', keywords: ['shapes', '2D', '3D', 'properties', 'patterns', 'symmetry'] },
      { number: 4, title: 'Measurement Basics', keywords: ['length', 'height', 'weight', 'capacity', 'time', 'comparing'] }
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
      { number: 1, title: 'Living Things', keywords: ['animals', 'plants', 'growth', 'life cycle', 'baby animals', 'seeds'] },
      { number: 2, title: 'Material Detectives', keywords: ['materials', 'wood', 'plastic', 'metal', 'fabric', 'properties', 'uses'] },
      { number: 3, title: 'Seasons and Weather', keywords: ['spring', 'summer', 'autumn', 'winter', 'weather patterns', 'seasonal changes'] },
      { number: 4, title: 'Push and Pull', keywords: ['forces', 'push', 'pull', 'movement', 'speed', 'direction'] }
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
      { number: 1, title: 'Advanced Phonics', keywords: ['Phase 5 phonics', 'alternative spellings', 'split digraphs', 'trigraphs', 'decoding'] },
      { number: 2, title: 'Reading Skills', keywords: ['fluency', 'expression', 'comprehension', 'prediction', 'inference'] },
      { number: 3, title: 'Sentence Construction', keywords: ['sentences', 'capital letters', 'full stops', 'question marks', 'exclamation marks'] },
      { number: 4, title: 'Word Building', keywords: ['prefixes', 'suffixes', '-ed', '-ing', '-s', 'plural', 'word families'] }
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
      { number: 1, title: 'Place Value', keywords: ['tens', 'ones', 'numbers to 100', 'comparing', 'ordering', 'number line'] },
      { number: 2, title: 'Addition and Subtraction', keywords: ['adding', 'subtracting', 'within 20', 'number bonds', 'word problems'] },
      { number: 3, title: 'Multiplication Intro', keywords: ['groups', 'arrays', 'doubling', 'halving', 'equal groups'] },
      { number: 4, title: 'Fractions and Measurement', keywords: ['half', 'quarter', 'length', 'weight', 'capacity', 'time'] }
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
      { number: 1, title: 'Animals Including Humans', keywords: ['animal groups', 'mammals', 'birds', 'fish', 'reptiles', 'amphibians', 'body parts'] },
      { number: 2, title: 'Plants', keywords: ['plant parts', 'leaves', 'flowers', 'roots', 'stem', 'trees', 'wild plants'] },
      { number: 3, title: 'Everyday Materials', keywords: ['wood', 'plastic', 'glass', 'metal', 'water', 'rock', 'properties'] },
      { number: 4, title: 'Seasonal Changes', keywords: ['four seasons', 'weather', 'day length', 'temperature', 'observations'] }
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
      { number: 1, title: 'Drawing Skills', keywords: ['lines', 'shapes', 'patterns', 'observation', 'pencil', 'crayon'] },
      { number: 2, title: 'Painting Techniques', keywords: ['brushwork', 'color mixing', 'primary colors', 'secondary colors', 'textures'] },
      { number: 3, title: 'Sculpture and 3D', keywords: ['modeling', 'clay', 'construction', '3D forms', 'joining'] },
      { number: 4, title: 'Artists and Inspiration', keywords: ['famous artists', 'art styles', 'observing art', 'responding to art'] }
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
      { number: 1, title: 'Reading Comprehension', keywords: ['inference', 'prediction', 'retrieval', 'vocabulary', 'summarizing'] },
      { number: 2, title: 'Narrative Writing', keywords: ['stories', 'character', 'setting', 'plot', 'past tense', 'description'] },
      { number: 3, title: 'Punctuation and Grammar', keywords: ['commas', 'apostrophes', 'questions', 'statements', 'commands', 'exclamations'] },
      { number: 4, title: 'Spelling Patterns', keywords: ['spelling rules', 'homophones', 'contractions', 'common exception words'] }
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
      { number: 1, title: 'Place Value to 100', keywords: ['tens', 'ones', 'comparing', 'ordering', 'number patterns', 'partitioning'] },
      { number: 2, title: 'Four Operations', keywords: ['addition', 'subtraction', 'multiplication', 'division', 'word problems'] },
      { number: 3, title: 'Fractions', keywords: ['halves', 'quarters', 'thirds', 'equal parts', 'fraction of amount'] },
      { number: 4, title: 'Measurement', keywords: ['length', 'mass', 'temperature', 'capacity', 'time', 'money'] }
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
      { number: 1, title: 'Living Things and Habitats', keywords: ['habitats', 'microhabitats', 'food chains', 'living', 'dead', 'never alive'] },
      { number: 2, title: 'Plants', keywords: ['seeds', 'bulbs', 'growth', 'water', 'light', 'temperature', 'germination'] },
      { number: 3, title: 'Uses of Materials', keywords: ['suitability', 'properties', 'changing shape', 'squashing', 'bending', 'twisting'] },
      { number: 4, title: 'Healthy Living', keywords: ['exercise', 'nutrition', 'hygiene', 'growth', 'basic needs'] }
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
      { number: 1, title: 'Drawing and Mark Making', keywords: ['sketching', 'shading', 'texture', 'tone', 'detail', 'observation'] },
      { number: 2, title: 'Color Theory', keywords: ['color wheel', 'warm colors', 'cool colors', 'tints', 'shades'] },
      { number: 3, title: 'Print Making', keywords: ['printing', 'patterns', 'repeated patterns', 'stamps', 'textures'] },
      { number: 4, title: 'Famous Artists', keywords: ['Monet', 'Van Gogh', 'art movements', 'impressionism', 'style'] }
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
      { number: 1, title: 'Reading for Meaning', keywords: ['comprehension', 'inference', 'authors intent', 'themes', 'literary language'] },
      { number: 2, title: 'Writing Stories', keywords: ['narrative structure', 'paragraphs', 'dialogue', 'description', 'character development'] },
      { number: 3, title: 'Grammar and Punctuation', keywords: ['nouns', 'verbs', 'adjectives', 'adverbs', 'prepositions', 'conjunctions'] },
      { number: 4, title: 'Non-Fiction Writing', keywords: ['information texts', 'instructions', 'explanations', 'reports', 'organization'] }
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
      { number: 1, title: 'Place Value', keywords: ['hundreds', 'tens', 'ones', 'numbers to 1000', 'comparing', 'rounding'] },
      { number: 2, title: 'Multiplication and Division', keywords: ['times tables', '3x', '4x', '8x tables', 'mental strategies', 'written methods'] },
      { number: 3, title: 'Fractions', keywords: ['unit fractions', 'non-unit fractions', 'equivalent fractions', 'comparing fractions'] },
      { number: 4, title: 'Geometry and Measurement', keywords: ['angles', 'right angles', 'perpendicular', 'parallel', 'perimeter'] }
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
      { number: 1, title: 'Rocks and Soils', keywords: ['igneous', 'sedimentary', 'metamorphic', 'fossils', 'soil formation', 'permeability'] },
      { number: 2, title: 'Animals and Humans', keywords: ['nutrition', 'skeleton', 'muscles', 'bones', 'joints', 'diet'] },
      { number: 3, title: 'Forces and Magnets', keywords: ['push', 'pull', 'friction', 'magnetic', 'poles', 'attract', 'repel'] },
      { number: 4, title: 'Light and Shadow', keywords: ['light sources', 'reflection', 'mirrors', 'shadows', 'sun safety'] }
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
      { number: 1, title: 'Maps and Directions', keywords: ['compass', 'north', 'south', 'east', 'west', 'symbols', 'keys'] },
      { number: 2, title: 'Rivers and Mountains', keywords: ['rivers', 'mountains', 'valleys', 'source', 'mouth', 'water cycle'] },
      { number: 3, title: 'Climate Zones', keywords: ['equator', 'tropics', 'poles', 'climate', 'temperature', 'rainfall'] },
      { number: 4, title: 'Settlements', keywords: ['village', 'town', 'city', 'land use', 'human geography'] }
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
      { number: 1, title: 'Stone Age Britain', keywords: ['hunter gatherers', 'stone tools', 'Skara Brae', 'prehistoric', 'cave art'] },
      { number: 2, title: 'Bronze and Iron Ages', keywords: ['bronze', 'iron', 'hillforts', 'farming', 'technology'] },
      { number: 3, title: 'Ancient Egypt', keywords: ['pharaohs', 'pyramids', 'mummies', 'Nile', 'hieroglyphics', 'civilization'] },
      { number: 4, title: 'Using Historical Evidence', keywords: ['sources', 'artifacts', 'archaeology', 'timelines', 'chronology'] }
    ]
  },

  // YEAR 4
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
      { number: 1, title: 'Advanced Reading', keywords: ['analyzing', 'evaluating', 'comparing texts', 'themes', 'language features'] },
      { number: 2, title: 'Creative Writing', keywords: ['descriptive writing', 'settings', 'characters', 'suspense', 'poetry'] },
      { number: 3, title: 'Advanced Grammar', keywords: ['fronted adverbials', 'pronouns', 'determiners', 'clauses', 'expanded noun phrases'] },
      { number: 4, title: 'Punctuation Mastery', keywords: ['inverted commas', 'apostrophes', 'commas in lists', 'direct speech'] }
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
      { number: 1, title: 'Place Value to 10000', keywords: ['thousands', 'hundreds', 'tens', 'ones', 'rounding', 'roman numerals'] },
      { number: 2, title: 'Times Tables and Division', keywords: ['6x', '7x', '9x', '11x', '12x tables', 'factor pairs', 'division facts'] },
      { number: 3, title: 'Fractions and Decimals', keywords: ['equivalent fractions', 'decimals', 'tenths', 'hundredths', 'fraction problems'] },
      { number: 4, title: 'Area and Perimeter', keywords: ['area', 'perimeter', 'rectangles', 'rectilinear shapes', 'coordinates'] }
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
      { number: 1, title: 'Living Things', keywords: ['classification', 'vertebrates', 'invertebrates', 'habitats', 'food chains'] },
      { number: 2, title: 'Digestion', keywords: ['digestive system', 'teeth', 'food chains', 'producers', 'consumers'] },
      { number: 3, title: 'States of Matter', keywords: ['solids', 'liquids', 'gases', 'changes of state', 'evaporation', 'condensation'] },
      { number: 4, title: 'Electricity and Sound', keywords: ['circuits', 'conductors', 'insulators', 'vibrations', 'pitch', 'volume'] }
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
      { number: 1, title: 'Europe and Beyond', keywords: ['continents', 'countries', 'capital cities', 'European Union', 'flags'] },
      { number: 2, title: 'Mountains and Volcanoes', keywords: ['volcanoes', 'earthquakes', 'tectonic plates', 'Ring of Fire', 'mountain ranges'] },
      { number: 3, title: 'Water Cycle', keywords: ['evaporation', 'condensation', 'precipitation', 'collection', 'rivers'] },
      { number: 4, title: 'Trade and Resources', keywords: ['natural resources', 'trade', 'import', 'export', 'fair trade'] }
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
      { number: 1, title: 'Roman Empire', keywords: ['Julius Caesar', 'Roman army', 'roads', 'baths', 'villas', 'Hadrians Wall'] },
      { number: 2, title: 'Anglo-Saxons', keywords: ['Saxons', 'settlements', 'kingdoms', 'Sutton Hoo', 'Anglo-Saxon culture'] },
      { number: 3, title: 'Vikings', keywords: ['longships', 'raids', 'Danelaw', 'Norse gods', 'Viking life'] },
      { number: 4, title: 'Historical Impact', keywords: ['legacy', 'influence', 'comparing periods', 'change and continuity'] }
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
      { number: 1, title: 'Literary Analysis', keywords: ['metaphor', 'simile', 'personification', 'analyzing language', 'authors purpose'] },
      { number: 2, title: 'Persuasive Writing', keywords: ['persuasion', 'argument', 'evidence', 'rhetorical questions', 'balanced arguments'] },
      { number: 3, title: 'Complex Grammar', keywords: ['relative clauses', 'modal verbs', 'passive voice', 'subjunctive', 'cohesion'] },
      { number: 4, title: 'Poetry and Performance', keywords: ['poetry forms', 'rhythm', 'meter', 'performance', 'interpretation'] }
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
      { number: 1, title: 'Large Numbers', keywords: ['place value', 'million', 'negative numbers', 'rounding', 'roman numerals'] },
      { number: 2, title: 'Four Operations', keywords: ['written methods', 'long multiplication', 'long division', 'order of operations'] },
      { number: 3, title: 'Fractions and Percentages', keywords: ['equivalent fractions', 'improper fractions', 'decimals', 'percentages', 'conversion'] },
      { number: 4, title: 'Shape and Measure', keywords: ['area', 'perimeter', 'volume', 'angles', 'reflection', 'translation'] }
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
      { number: 1, title: 'Materials and Properties', keywords: ['dissolving', 'separating mixtures', 'reversible changes', 'irreversible changes'] },
      { number: 2, title: 'Earth and Space', keywords: ['solar system', 'planets', 'Earth rotation', 'day and night', 'seasons'] },
      { number: 3, title: 'Forces', keywords: ['gravity', 'air resistance', 'water resistance', 'friction', 'mechanisms', 'levers'] },
      { number: 4, title: 'Life Cycles', keywords: ['reproduction', 'mammals', 'amphibians', 'insects', 'birds', 'plants'] }
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
      { number: 1, title: 'Americas', keywords: ['North America', 'South America', 'countries', 'physical features', 'cities'] },
      { number: 2, title: 'Biomes and Climate', keywords: ['rainforest', 'desert', 'tundra', 'grassland', 'climate zones'] },
      { number: 3, title: 'Rivers', keywords: ['river features', 'erosion', 'deposition', 'flood plains', 'deltas', 'meanders'] },
      { number: 4, title: 'Climate Change', keywords: ['global warming', 'greenhouse gases', 'sustainability', 'renewable energy'] }
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
      { number: 1, title: 'Ancient Greek Civilization', keywords: ['Athens', 'Sparta', 'city-states', 'Greek society', 'daily life'] },
      { number: 2, title: 'Greek Democracy', keywords: ['democracy', 'government', 'citizenship', 'voting', 'assembly'] },
      { number: 3, title: 'Greek Culture', keywords: ['Olympics', 'theater', 'philosophy', 'architecture', 'art'] },
      { number: 4, title: 'Greek Legacy', keywords: ['influence', 'modern world', 'alphabet', 'mathematics', 'science'] }
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
      { number: 1, title: 'Critical Reading', keywords: ['evaluation', 'comparing texts', 'implicit meaning', 'bias', 'perspective'] },
      { number: 2, title: 'Advanced Writing', keywords: ['formal writing', 'informal writing', 'voice', 'audience', 'purpose'] },
      { number: 3, title: 'Grammar Mastery', keywords: ['subjunctive', 'passive', 'perfect tense', 'colons', 'semicolons', 'dashes'] },
      { number: 4, title: 'SATs Preparation', keywords: ['exam techniques', 'comprehension strategies', 'spelling rules', 'revision'] }
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
      { number: 1, title: 'Number and Place Value', keywords: ['ten million', 'negative numbers', 'rounding', 'estimation', 'calculations'] },
      { number: 2, title: 'Calculation Mastery', keywords: ['four operations', 'order of operations', 'mental strategies', 'problem solving'] },
      { number: 3, title: 'FDP and Ratio', keywords: ['fractions', 'decimals', 'percentages', 'ratio', 'proportion', 'algebra'] },
      { number: 4, title: 'Geometry and Statistics', keywords: ['circles', 'area', 'volume', 'mean', 'graphs', 'pie charts'] }
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
      { number: 1, title: 'Classification', keywords: ['micro-organisms', 'Carl Linnaeus', 'kingdoms', 'classification keys'] },
      { number: 2, title: 'Circulation and Health', keywords: ['heart', 'blood vessels', 'circulatory system', 'healthy lifestyle', 'diet', 'exercise'] },
      { number: 3, title: 'Evolution and Inheritance', keywords: ['adaptation', 'evolution', 'inheritance', 'fossils', 'Charles Darwin'] },
      { number: 4, title: 'Light and Electricity', keywords: ['light travels', 'shadows', 'reflection', 'circuits', 'symbols', 'voltage'] }
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
      { number: 1, title: 'Global Regions', keywords: ['Asia', 'Africa', 'latitude', 'longitude', 'time zones', 'hemispheres'] },
      { number: 2, title: 'Economic Geography', keywords: ['trade', 'industry', 'agriculture', 'tourism', 'economic development'] },
      { number: 3, title: 'Environmental Issues', keywords: ['deforestation', 'pollution', 'conservation', 'endangered species', 'sustainability'] },
      { number: 4, title: 'Migration and Settlement', keywords: ['population', 'migration', 'urban', 'rural', 'push factors', 'pull factors'] }
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
      { number: 1, title: 'Victorian Era', keywords: ['Queen Victoria', 'Industrial Revolution', 'railways', 'factories', 'social reform'] },
      { number: 2, title: 'British Empire', keywords: ['empire', 'colonies', 'trade', 'exploration', 'legacy'] },
      { number: 3, title: 'World Wars', keywords: ['WW1', 'WW2', 'trenches', 'Blitz', 'evacuation', 'home front'] },
      { number: 4, title: 'Modern Britain', keywords: ['post-war', 'immigration', 'social change', 'technology', '20th century'] }
    ]
  }
};

function generateIndexFile(subjectKey, data) {
  let content = `${data.title}\n\n`;

  content += 'Learning Objectives:\n';
  data.objectives.forEach(obj => {
    content += `- ${obj}\n`;
  });

  content += '\nChapters:\n\n';
  data.chapters.forEach(chapter => {
    content += `${chapter.number}, ${chapter.title}, ${chapter.keywords.join(', ')}\n`;
  });

  return content;
}

function generateChapterFile(subjectKey, chapterData, chapterNumber) {
  const subjectTitle = chapterStructures[subjectKey].title;
  const subject = subjectTitle.split(' - ')[0];

  let content = `${subject} - Chapter ${chapterNumber}: ${chapterData.title}\n\n`;

  // Generate 3-4 topics per chapter based on keywords
  const keywords = chapterData.keywords;
  const topicsCount = Math.min(keywords.length, 4);

  for (let topicNum = 1; topicNum <= topicsCount; topicNum++) {
    const keyword = keywords[topicNum - 1];
    const topicTitle = keyword.charAt(0).toUpperCase() + keyword.slice(1);

    content += `TOPIC ${topicNum}: ${topicTitle}\n\n`;

    // Theory section
    content += `Theory:\n`;
    content += `This section covers ${keyword} in detail. Students will learn the fundamental concepts, key terminology, and important principles related to ${keyword}. Understanding ${keyword} is essential for building a strong foundation in this subject area.\n\n`;
    content += `Key points to remember:\n`;
    content += `- ${topicTitle} helps develop important skills\n`;
    content += `- Practice and repetition strengthen understanding\n`;
    content += `- Real-world applications make learning meaningful\n\n`;

    // Examples section
    content += `Examples:\n`;
    for (let exNum = 1; exNum <= 3; exNum++) {
      content += `Example ${exNum}: ${topicTitle} Application\n`;
      content += `- Step 1: Observe and identify the ${keyword}\n`;
      content += `- Step 2: Apply the concept practically\n`;
      content += `- Step 3: Check your understanding\n`;
      content += `- Result: Successfully demonstrated ${keyword}\n\n`;
    }

    // Interactive Worksheet
    content += `Interactive Worksheet:\n`;
    content += `1. Complete the ${keyword} activity\n`;
    content += `2. Draw or create a representation\n`;
    content += `3. Explain your thinking\n`;
    content += `4. Share with a partner\n`;
    content += `5. Reflect on what you learned\n\n`;

    // Easy Level Problems
    content += `Problems - Easy Level:\n`;
    for (let i = 1; i <= 10; i++) {
      content += `${i}. Basic ${keyword} question: Complete the simple task\n`;
    }
    content += `\n`;

    // Medium Level Problems
    content += `Problems - Medium Level:\n`;
    for (let i = 1; i <= 10; i++) {
      content += `${i}. Intermediate ${keyword} question: Apply your knowledge\n`;
    }
    content += `\n`;

    // Difficult Level Problems
    content += `Problems - Difficult Level:\n`;
    for (let i = 1; i <= 10; i++) {
      content += `${i}. Advanced ${keyword} question: Demonstrate mastery\n`;
    }
    content += `\n`;

    if (topicNum < topicsCount) {
      content += `---\n\n`;
    }
  }

  return content;
}

// Generate all files
console.log('Generating knowledge base structure...\n');

let filesCreated = 0;

Object.keys(chapterStructures).forEach(subjectKey => {
  const data = chapterStructures[subjectKey];

  // Generate index file
  const indexPath = path.join(knowledgeBasePath, `${subjectKey}.txt`);
  const indexContent = generateIndexFile(subjectKey, data);
  fs.writeFileSync(indexPath, indexContent);
  console.log(`✓ Created ${subjectKey}.txt`);
  filesCreated++;

  // Generate chapter files
  data.chapters.forEach(chapter => {
    const chapterPath = path.join(knowledgeBasePath, `${subjectKey}_chapter${chapter.number}.txt`);
    const chapterContent = generateChapterFile(subjectKey, chapter, chapter.number);
    fs.writeFileSync(chapterPath, chapterContent);
    console.log(`✓ Created ${subjectKey}_chapter${chapter.number}.txt`);
    filesCreated++;
  });
});

console.log(`\n✅ Generation complete! Created ${filesCreated} files.`);
console.log('\nNext steps:');
console.log('1. Review generated content and enhance with subject-specific details');
console.log('2. Update UI components to display chapters');
console.log('3. Create chapter detail pages');
console.log('4. Test the new structure');
