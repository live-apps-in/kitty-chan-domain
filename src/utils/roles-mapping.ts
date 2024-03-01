export const compareRolesMapping = (newMapping: any[], oldMapping: any[]) => {
  const differentObjects = [];

  for (let i = 0; i < newMapping.length; i++) {
    for (let j = 0; j < oldMapping.length; j++) {
      if (newMapping[i].roleId === oldMapping[j].roleId) {
        // assume both objects have a "roleId" property to uniquely identify them
        if (
          newMapping[i].emoji.type === 'standard' &&
          newMapping[i].emoji.standardEmoji !==
            oldMapping[j].emoji.standardEmoji
        ) {
          differentObjects.push(newMapping[i]); // push both objects with different values into the new array
        } else if (
          newMapping[i].emoji.type === 'guild' &&
          newMapping[i].emoji.id !== oldMapping[j].emoji.id
        ) {
          differentObjects.push(newMapping[i]); // push both objects with different values into the new array
        }
        break; // move on to the next object in arr1
      }
    }
  }

  return differentObjects;
};
