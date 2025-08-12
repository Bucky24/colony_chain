export function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomPlanetName() {
  const prefixes = ["Zor", "Xen", "Vel", "Cry", "Astra", "Oph", "Thal", "Quor", "Lum", "Vor"];
  const middles = ["an", "or", "ex", "ul", "ar", "en", "is", "um", "ea", "ix"];
  const suffixes = ["ion", "ara", "os", "is", "on", "ius", "arae", "ora", "en"];

  const descriptors = ["Prime", "Secundus", "Major", "Minor", "IV", "VII", "Alpha", "Beta", "Gamma", "Delta"];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  let name = prefix + middle + suffix;

  // 50% chance to add descriptor
  if (Math.random() < 0.5) {
    const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
    name += " " + descriptor;
  }

  return name;
}

export function randomStarName() {
  const syllables = ["Sol", "Tau", "Eri", "Ke", "Prox", "Rig", "Bet", "Alt", "Den", "Cap"];
  return syllables[Math.floor(Math.random() * syllables.length)] + 
         syllables[Math.floor(Math.random() * syllables.length)] +
         (Math.floor(Math.random() * 900) + 100); // star number
}