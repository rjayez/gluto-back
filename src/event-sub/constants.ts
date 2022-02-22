export const TWO_MINUTES_IN_SECONDES = 120;

export const STATUS = {
  VERIFICATION: "webhook_callback_verification_pending",
  ENABLED: "enabled",
};

export const SUBSCRIPTION_TYPE = {
  FOLLOW: "channel.follow",
  STREAM_UP: "stream.online",
  STREAM_DOWN: "stream.offline",
  SUB: "channel.subscribe",
  RESUB: "channel.subscription.message",
  SUB_GIFT: "channel.subscription.gift",
  RAID: "channel.raid",
  CUSTOM_REWARD_REDEMPTION: "channel.channel_points_custom_reward_redemption.add",
};

export const MESSAGE_POINTS = [
  "Ah ! T'aimes jouer avec ce point de chaine %s !",
  "Arrête de jouer %s !",
  "T'as vu %s, ça fait rien ;)",
  "%s, tu aimes dépenser des points de chaine pour rien.",
  "Oh, t'as appris à utiliser les points de chaine, bravo le veau",
  "Tiens, ton chat joue sur le clavier ?",
  "Chérie, les viewers jouent avec les points de chaine",
  "Ok, vu.",
];

export const TEST_REWARD_ID = "0a111137-52d4-405e-a510-70731abf8fcc";
