export interface CooldownStretch {
  name: string;
  duration: number;
  desc: string;
}

export type Lang = 'en' | 'ru';

export const COOLDOWN_STRETCHES: Record<Lang, CooldownStretch[]> = {
  en: [
    { name: 'Quad Stretch', duration: 30, desc: 'Standing, pull heel to glute, 15s per leg' },
    { name: 'Forward Fold', duration: 30, desc: 'Legs straight, reach for toes' },
    { name: 'Chest Stretch', duration: 30, desc: 'Hand on wall, rotate torso away' },
    { name: 'Cat-Cow', duration: 40, desc: 'On all fours, arch and round back' },
    { name: "Child's Pose", duration: 40, desc: 'Sit on heels, arms forward, relax' },
    { name: 'Lying Twist', duration: 40, desc: 'On back, knees to side, 20s per side' },
    { name: 'Hip Stretch', duration: 60, desc: 'Half pigeon, 30s per leg' },
  ],
  ru: [
    { name: 'Растяжка квадрицепса', duration: 30, desc: 'Стоя, подтяни пятку к ягодице, 15 сек на ногу' },
    { name: 'Наклон к ногам', duration: 30, desc: 'Ноги прямые, тянись к носкам' },
    { name: 'Растяжка грудных', duration: 30, desc: 'Рука на стене, разверни корпус' },
    { name: 'Кошка-корова', duration: 40, desc: 'На четвереньках, прогибай и округляй спину' },
    { name: 'Поза ребёнка', duration: 40, desc: 'Сядь на пятки, руки вперёд, расслабься' },
    { name: 'Лежачий твист', duration: 40, desc: 'На спине, колени в сторону, 20 сек на сторону' },
    { name: 'Растяжка бёдер', duration: 60, desc: 'Полуголубь, 30 сек на ногу' },
  ],
};
