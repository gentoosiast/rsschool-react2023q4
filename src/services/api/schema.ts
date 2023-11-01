import { array, enumType, number, object, string } from 'valibot';

export const CharacterSchema = object({
  created: string(),
  gender: enumType(['Female', 'Male', 'Genderless', 'unknown']),
  id: number(),
  image: string(),
  location: string(),
  name: string(),
  origin: string(),
  species: string(),
  status: enumType(['Alive', 'Dead', 'unknown']),
  type: string(),
  url: string(),
});

export const ApiSchema = array(CharacterSchema);
