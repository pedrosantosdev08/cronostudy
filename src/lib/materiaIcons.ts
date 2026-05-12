import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAtom,
  faBook,
  faCalculator,
  faDna,
  faFlask,
  faGlobeAmericas,
  faLandmark,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export const MATERIA_ICON_MAP: Record<string, IconDefinition> = {
  Matemática: faCalculator,
  Português: faBook,
  História: faLandmark,
  Geografia: faGlobeAmericas,
  Biologia: faDna,
  Química: faFlask,
  Física: faAtom,
};

export function getMateriaIcon(titulo: string): IconDefinition {
  return MATERIA_ICON_MAP[titulo] ?? faQuestionCircle;
}
