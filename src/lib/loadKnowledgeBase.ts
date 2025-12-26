import fs from 'fs';
import path from 'path';

export interface KnowledgeBaseContent {
  title: string;
  learningObjectives: string[];
  keyTopics: string[];
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
    const sections = content.split('\n\n');
    const parsedContent: KnowledgeBaseContent = {
      title: '',
      learningObjectives: [],
      keyTopics: [],
      activities: [],
      funFacts: [],
      tips: [],
    };

    let currentSection = '';

    for (const section of sections) {
      const lines = section.trim().split('\n');
      const firstLine = lines[0];

      if (firstLine.includes('Learning Objectives')) {
        currentSection = 'learningObjectives';
        parsedContent.learningObjectives = lines
          .slice(1)
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim());
      } else if (firstLine.includes('Key Topics')) {
        currentSection = 'keyTopics';
        parsedContent.keyTopics = lines
          .slice(1)
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim());
      } else if (firstLine.includes('Sample Activities')) {
        currentSection = 'activities';
        parsedContent.activities = lines
          .slice(1)
          .filter(line => line.trim().startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim());
      } else if (!currentSection && firstLine.trim()) {
        // First section is usually the title
        parsedContent.title = firstLine.trim();
      }
    }

    // Generate fun facts and tips from the content
    if (parsedContent.keyTopics.length > 0) {
      parsedContent.funFacts.push(
        `Did you know? ${parsedContent.keyTopics[0].split('.')[0]}!`
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
