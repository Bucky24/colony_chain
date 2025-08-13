import PortImage from './assets/port.png';
import MineImage from './assets/mine.png';
import FarmImage from './assets/farm.png';
import HouseImage from './assets/house.png';
import VaultImage from './assets/vault.png';

export const PLANET_TYPES = {
  LUSH: 'Lush',
  DESERT: 'Desert',
  ICE: 'Ice',
  BARREN: 'Barren',
};

export const BUILDING_TYPES = {
  PORT: 'Port',
  MINE: 'Mine',
  FARM: 'Farm',
  HOUSE: 'House',
  VAULT: 'Vault',
}

export const BUILDING_IMAGES = {
  PORT: PortImage,
  MINE: MineImage,
  FARM: FarmImage,
  HOUSE: HouseImage,
  VAULT: VaultImage,
};

export const CONNECTION_FROM = 'from';
export const CONNECTION_TO = 'to';