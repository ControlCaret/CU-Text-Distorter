import { distortText, distortionAmount } from './distort.ts';

function element<T extends HTMLElement>(id: string, type: new () => T): T {
  const found = document.getElementById(id);
  if (!(found instanceof type)) {
    throw new Error(`Missing or unexpected element: #${id}`);
  }
  return found;
}

const source = element('source-text', HTMLTextAreaElement);
const result = element('distorted-text', HTMLTextAreaElement);
const health = element('brain-health', HTMLInputElement);
const healthValue = element('health-value', HTMLOutputElement);
const distortionValue = element('distortion-value', HTMLOutputElement);

function update(): void {
  const brainHealth = health.valueAsNumber;
  healthValue.value = `${brainHealth}%`;
  distortionValue.value = `${Math.round(distortionAmount(brainHealth) * 100)}%`;
  result.value = distortText(source.value, brainHealth);
}

source.addEventListener('input', update);
health.addEventListener('input', update);
update();
