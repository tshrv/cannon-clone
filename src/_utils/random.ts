export class Random {
  randSeed(): number {
    return Math.random();
  }

  randInt(min: number, max: number): number {
    return Math.floor(this.randSeed() * (max - min) + 1);
  }

  randIntList(min: number, max: number, size: number): number[] {
    const list: number[] = [];
    for (let i = 0; i < size; i++) {
      list.push(this.randInt(min, max));
    }
    return list;
  }
}
