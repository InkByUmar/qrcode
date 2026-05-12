'use server';
/**
 * @fileOverview An AI tool that generates artistic backgrounds for QR codes using Imagen 4.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BackgroundGeneratorInputSchema = z.object({
  prompt: z.string().describe('The theme or prompt for the background image.'),
});

export async function generateQrBackground(prompt: string): Promise<string> {
  const { media } = await ai.generate({
    model: 'googleai/imagen-4.0-fast-generate-001',
    prompt: `A professional, high-contrast, minimalist artistic background for a QR code. Theme: ${prompt}. Ensure the center is relatively clear and the edges are stylized. Dark aesthetic with vibrant accents.`,
  });
  
  if (!media) throw new Error('Generation failed');
  return media.url;
}
