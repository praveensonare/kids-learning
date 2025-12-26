import fs from 'fs';
import path from 'path';

export interface Topic {
  id: string;
  number: number;
  title: string;
  description: string;
  theory?: string;
  examples?: string;
  worksheets?: string;
  problemsEasy?: string[];
  problemsMedium?: string[];
  problemsDifficult?: string[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  keywords: string[];
  topics: Topic[];
}

export interface KnowledgeBaseContent {
  title: string;
  learningObjectives: string[];
  chapters: Chapter[];
  activities: string[];
  funFacts: string[];
  tips: string[];
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
      chapters: [],
      activities: [],
      funFacts: [],
      tips: [],
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

    // Extract chapters from index file
    // New format: number, title, keyword1, keyword2, ...
    const chaptersStart = lines.findIndex(line => line.includes('Chapters:'));

    if (chaptersStart !== -1) {
      for (let i = chaptersStart + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('Sample') || line.startsWith('Assessment')) break;

        // Parse CSV format: number, title, keywords...
        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 2) {
          const chapterNumber = parseInt(parts[0]);
          const chapterTitle = parts[1];
          const keywords = parts.slice(2); // Rest are keywords
          const chapterId = chapterTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          if (!isNaN(chapterNumber)) {
            const chapter: Chapter = {
              id: chapterId,
              number: chapterNumber,
              title: chapterTitle,
              keywords: keywords,
              topics: []
            };

            // Read individual chapter file
            const chapterFilename = `${className}_${subjectName}_chapter${chapterNumber}.txt`;
            const chapterFilePath = path.join(process.cwd(), 'knowledgebase', chapterFilename);

            if (fs.existsSync(chapterFilePath)) {
              const chapterContent = fs.readFileSync(chapterFilePath, 'utf-8');
              chapter.topics = parseChapterTopics(chapterContent);
            }

            parsedContent.chapters.push(chapter);
          }
        }
      }
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
    if (parsedContent.chapters.length > 0) {
      parsedContent.funFacts.push(
        `Explore ${parsedContent.chapters.length} exciting chapters in this subject!`
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

// Helper function to parse topics from chapter content
function parseChapterTopics(content: string): Topic[] {
  const topics: Topic[] = [];
  const lines = content.split('\n');

  // Find all TOPIC sections
  const topicPattern = /^TOPIC (\d+):\s*(.+)$/;
  let currentTopic: Topic | null = null;
  let currentSection = '';
  let sectionContent: string[] = [];
  let problemsEasy: string[] = [];
  let problemsMedium: string[] = [];
  let problemsDifficult: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const topicMatch = line.match(topicPattern);

    if (topicMatch) {
      // Save previous topic
      if (currentTopic) {
        saveSectionContent(currentTopic, currentSection, sectionContent);
        currentTopic.problemsEasy = problemsEasy;
        currentTopic.problemsMedium = problemsMedium;
        currentTopic.problemsDifficult = problemsDifficult;
        topics.push(currentTopic);
      }

      // Start new topic
      const topicNumber = parseInt(topicMatch[1]);
      const topicTitle = topicMatch[2].trim();
      currentTopic = {
        id: topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        number: topicNumber,
        title: topicTitle,
        description: '',
      };
      currentSection = '';
      sectionContent = [];
      problemsEasy = [];
      problemsMedium = [];
      problemsDifficult = [];
    } else if (line.startsWith('---')) {
      // Topic separator
      continue;
    } else if (line.trim() === 'Theory:') {
      saveSectionContent(currentTopic, currentSection, sectionContent);
      currentSection = 'Theory';
      sectionContent = [];
    } else if (line.startsWith('Examples:') || line.includes('Example 1:')) {
      saveSectionContent(currentTopic, currentSection, sectionContent);
      currentSection = 'Examples';
      sectionContent = line.startsWith('Examples:') ? [] : [line];
    } else if (line.startsWith('Interactive Worksheet:')) {
      saveSectionContent(currentTopic, currentSection, sectionContent);
      currentSection = 'Worksheet';
      sectionContent = [];
    } else if (line.startsWith('Problems - Easy Level:')) {
      saveSectionContent(currentTopic, currentSection, sectionContent);
      currentSection = 'ProblemsEasy';
      sectionContent = [];
    } else if (line.startsWith('Problems - Medium Level:')) {
      saveSectionContent(currentTopic, currentSection, sectionContent);
      currentSection = 'ProblemsMedium';
      sectionContent = [];
    } else if (line.startsWith('Problems - Difficult Level:')) {
      saveSectionContent(currentTopic, currentSection, sectionContent);
      currentSection = 'ProblemsDifficult';
      sectionContent = [];
    } else if (currentSection) {
      const trimmed = line.trim();
      if (trimmed) {
        if (currentSection === 'ProblemsEasy') {
          if (/^\d+\./.test(trimmed)) problemsEasy.push(trimmed);
        } else if (currentSection === 'ProblemsMedium') {
          if (/^\d+\./.test(trimmed)) problemsMedium.push(trimmed);
        } else if (currentSection === 'ProblemsDifficult') {
          if (/^\d+\./.test(trimmed)) problemsDifficult.push(trimmed);
        } else {
          sectionContent.push(line);
        }
      }
    }
  }

  // Save last topic
  if (currentTopic) {
    saveSectionContent(currentTopic, currentSection, sectionContent);
    currentTopic.problemsEasy = problemsEasy;
    currentTopic.problemsMedium = problemsMedium;
    currentTopic.problemsDifficult = problemsDifficult;
    topics.push(currentTopic);
  }

  return topics;
}

function saveSectionContent(topic: Topic | null, section: string, content: string[]) {
  if (!topic || !section || content.length === 0) return;

  const text = content.join('\n').trim();
  if (section === 'Theory') {
    topic.theory = text;
  } else if (section === 'Examples') {
    topic.examples = text;
  } else if (section === 'Worksheet') {
    topic.worksheets = text;
  }
}
