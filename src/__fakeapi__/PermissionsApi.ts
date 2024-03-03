import { Entity as EntityType, Structures as StructuresType, Roles, AllRoles, User } from "../types";
import { Structures, EntityRoles, Users } from './data';

/* prepare data */
const StructureRoles: {
  [key: string]: Roles;
} = {};

Structures.forEach((structure) => {
  StructureRoles[structure] = [AllRoles.FULL_ACCESS, AllRoles.BASIC_ACCESS, AllRoles.NO_ACCESS];
});

const AllEntities: { [key: string]: EntityType } = {}

Structures.forEach((structure, index) => {
  if (index % 2 === 0) {
    AllEntities[structure] = { "England": ["Topco", "Midco"] };
  } else {
    AllEntities[structure] = { "Luxemborg": ["Holdco", "Google", "Meta"] };
  }
});

/* prepare data end */

class PermissionsApi {
  getStructures(): Promise<StructuresType> {
    return Promise.resolve(Structures);
  }

  getRolesForStructure(structure: string): Promise<Roles> {
    const rolesForStructure = StructureRoles[structure];
    return Promise.resolve(rolesForStructure);
  }

  getEntityForStructure(structure: string): Promise<EntityType> {
    const entityForStructure = AllEntities[structure];
    return Promise.resolve(entityForStructure);
  }

  getRolesForEntity(entity: string): Promise<Roles> {
    const rolesForEntity = EntityRoles[entity];
    return Promise.resolve(rolesForEntity);
  }

  getUsers(): Promise<Array<User>> {
    return Promise.resolve(Users)
  }
}

const permissionsApi = new PermissionsApi();

export default permissionsApi;