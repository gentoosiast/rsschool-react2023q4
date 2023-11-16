import { array, number, object, picklist, string } from 'valibot';

export const CharacterSchema = object({
  created: string(),
  gender: picklist(['Female', 'Male', 'Genderless', 'unknown']),
  id: number(),
  location: string(),
  name: string(),
  origin: string(),
  species: string(),
  status: picklist(['Alive', 'Dead', 'unknown']),
  type: string(),
});

export const ApiSchema = array(CharacterSchema);
