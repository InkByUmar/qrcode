'use server';
/**
 * @fileOverview An AI tool that suggests more concise or impactful wording for text embedded in a QR code.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QrContentRefinerInputSchema = z.object({
  text: z.string().describe('The text content to be refined for a QR code.'),
});
export type QrContentRefinerInput = z.infer<typeof QrContentRefinerInputSchema>;

const QrContentRefinerOutputSchema = z.string().describe('The refined text content suitable for a QR code.');
export type QrContentRefinerOutput = z.infer<typeof QrContentRefinerOutputSchema>;

export async function qrContentRefiner(input: QrContentRefinerInput): Promise<QrContentRefinerOutput> {
  return qrContentRefinerFlow(input);
}

const qrContentRefinerPrompt = ai.definePrompt({
  name: 'qrContentRefinerPrompt',
  input: {schema: QrContentRefinerInputSchema},
  output: {schema: QrContentRefinerOutputSchema},
  prompt: `You are an AI assistant specialized in creating concise and impactful text for QR codes.
Refine the following text to be brief, clear, and effective. Focus on call-to-action effectiveness.

Text to refine:
"""{{{text}}}"""

Provide only the refined text without commentary.`,
});

const qrContentRefinerFlow = ai.defineFlow(
  {
    name: 'qrContentRefinerFlow',
    inputSchema: QrContentRefinerInputSchema,
    outputSchema: QrContentRefinerOutputSchema,
  },
  async input => {
    const {output} = await qrContentRefinerPrompt(input);
    if (!output) throw new Error('Refinement failed');
    return output;
  }
);
