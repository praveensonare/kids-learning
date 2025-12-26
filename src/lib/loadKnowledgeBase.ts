import fs from 'fs';
import path from 'path';

export interface Topic {
  id: string;
  number: number;
  title: string;
  fullContent: string;
  theory?: string;
  examples?: string;
  worksheets?: string;
}

export interface KnowledgeBaseContent {
  title: string;
  learningObjectives: string[];
  keyTopics: string[];
  activities: string[];
  funFacts: string[];
  tips: string[];
  topics: Topic[];
}

export async function loadKnowledgeBase(
  classId: string,
  subjectId: string
): Promise<KnowledgeBaseContent | null> {
  try {
    // Map class IDs to file naming convention
    const classMap: Record<string, string> = {
      'nursery': 'nursery',
      'reception': 'reception',
      'year-1': 'year1',
      'year-2': 'year2',
      'year-3': 'year3',
      'year-4': 'year4',
      'year-5': 'year5',
      'year-6': 'year6',
    };

    // Map subject IDs to file naming convention
    const subjectMap: Record<string, string> = {
      'literacy': 'literacy',
      'numeracy': 'numeracy',
      'english': 'english',
      'maths': 'maths',
      'science': 'science',
      'art': 'art',
      'history': 'history',
      'geography': 'geography',
    };

    const className = classMap[classId];
    const subjectName = subjectMap[subjectId];

    if (!className || !subjectName) {
      return null;
    }

    const fileName = `${className}_${subjectName}.txt`;
    const filePath = path.join(process.cwd(), 'knowledgebase', fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse the content
    const lines = content.split('\n');
    const parsedContent: KnowledgeBaseContent = {
      title: '',
      learningObjectives: [],
      keyTopics: [],
      activities: [],
      funFacts: [],
      tips: [],
      topics: [],
    };

    // Extract title (first line)
    if (lines.length > 0) {
      parsedContent.title = lines[0].trim();
    }

    // Extract learning objectives
    const objectivesStart = lines.findIndex(line => line.includes('Learning Objectives:'));
    if (objectivesStart !== -1) {
      let i = objectivesStart + 1;
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        parsedContent.learningObjectives.push(lines[i].replace(/^-\s*/, '').trim());
        i++;
      }
    }

    // Extract topics (TOPIC 1: Title, TOPIC 2: Title, etc.)
    const topicPattern = /^TOPIC (\d+):\s*(.+)$/;
    let currentTopic: Topic | null = null;
    let currentSection = '';
    let sectionContent: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const topicMatch = line.match(topicPattern);

      if (topicMatch) {
        // Save previous topic if exists
        if (currentTopic) {
          if (currentSection && sectionContent.length > 0) {
            if (currentSection === 'Theory') {
              currentTopic.theory = sectionContent.join('\n');
            } else if (currentSection === 'Examples') {
              currentTopic.examples = sectionContent.join('\n');
            } else if (currentSection === 'Worksheets') {
              currentTopic.worksheets = sectionContent.join('\n');
            }
          }
          parsedContent.topics.push(currentTopic);
        }

        // Start new topic
        const topicNumber = parseInt(topicMatch[1]);
        const topicTitle = topicMatch[2].trim();
        currentTopic = {
          id: topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          number: topicNumber,
          title: topicTitle,
          fullContent: '',
          theory: '',
          examples: '',
          worksheets: '',
        };
        currentSection = '';
        sectionContent = [];
      } else if (currentTopic) {
        // Check for section headers
        if (line.trim() === 'Theory:' || line.startsWith('Theory:')) {
          if (currentSection && sectionContent.length > 0) {
            if (currentSection === 'Theory') {
              currentTopic.theory = sectionContent.join('\n');
            } else if (currentSection === 'Examples') {
              currentTopic.examples = sectionContent.join('\n');
            } else if (currentSection === 'Worksheets') {
              currentTopic.worksheets = sectionContent.join('\n');
            }
          }
          currentSection = 'Theory';
          sectionContent = [];
        } else if (line.trim() === 'Examples:' || line.startsWith('Examples:') || line.includes('Mental Strategies:') || line.includes('Examples - ')) {
          if (currentSection && sectionContent.length > 0) {
            if (currentSection === 'Theory') {
              currentTopic.theory = sectionContent.join('\n');
            } else if (currentSection === 'Examples') {
              currentTopic.examples = sectionContent.join('\n');
            } else if (currentSection === 'Worksheets') {
              currentTopic.worksheets = sectionContent.join('\n');
            }
          }
          currentSection = 'Examples';
          sectionContent = [];
        } else if (line.trim() === 'Worksheets:' || line.startsWith('Worksheets:')) {
          if (currentSection && sectionContent.length > 0) {
            if (currentSection === 'Theory') {
              currentTopic.theory = sectionContent.join('\n');
            } else if (currentSection === 'Examples') {
              currentTopic.examples = sectionContent.join('\n');
            } else if (currentSection === 'Worksheets') {
              currentTopic.worksheets = sectionContent.join('\n');
            }
          }
          currentSection = 'Worksheets';
          sectionContent = [];
        } else if (currentSection) {
          sectionContent.push(line);
        }
      }
    }

    // Save last topic
    if (currentTopic) {
      if (currentSection && sectionContent.length > 0) {
        if (currentSection === 'Theory') {
          currentTopic.theory = sectionContent.join('\n');
        } else if (currentSection === 'Examples') {
          currentTopic.examples = sectionContent.join('\n');
        } else if (currentSection === 'Worksheets') {
          currentTopic.worksheets = sectionContent.join('\n');
        }
      }
      parsedContent.topics.push(currentTopic);
    }

    // Extract sample activities
    const activitiesStart = lines.findIndex(line => line.includes('Sample Activities:'));
    if (activitiesStart !== -1) {
      let i = activitiesStart + 1;
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        parsedContent.activities.push(lines[i].replace(/^-\s*/, '').trim());
        i++;
      }
    }

    // Generate fun facts and tips
    if (parsedContent.topics.length > 0) {
      parsedContent.funFacts.push(
        `Explore ${parsedContent.topics.length} exciting topics in this subject!`
      );
    }

    parsedContent.tips.push(
      'Take your time and practice regularly to master these concepts!'
    );

    return parsedContent;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return null;
  }
}
