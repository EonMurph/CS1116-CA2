export function aim(character_x, character_y, target_x, target_y) {
  // get perpendicular distance
  let perpendicular = Math.abs(character_y - target_y);
  let distance = Math.sqrt(
    (target_x - character_x) ** 2 + (target_y - character_y) ** 2
  );
  let angle = Math.cos(perpendicular / distance);
  
  return angle;
}
