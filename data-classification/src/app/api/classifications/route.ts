import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'classification-simple.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return Response.json(data);
  } catch (error) {
    console.error('Error reading classification file:', error);
    return Response.json({ error: 'Failed to load classifications' }, { status: 500 });
  }
} 