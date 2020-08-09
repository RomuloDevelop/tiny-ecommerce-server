import { Sequelize } from 'sequelize/types';

const getLasNodeForCategory = `
    create or replace function get_last_node_id(client int)
    returns int
    language plpgsql
    as
    $$
        declare
            last_node_id RECORD;
            result_node integer;
        begin
            SELECT * INTO last_node_id
            FROM public."CategoryMaps" t1
            WHERE t1.client_id = client and NOT EXISTS (
                 SELECT *
                 FROM public."CategoryMaps" t2
                 WHERE t2.client_id = client and t2.node_id > t1.node_id
            );
            result_node = last_node_id.node_id;
            if result_node ISNULL then
               result_node = 0;
            end if;
            return result_node + 1;
        end;
    $$;`;

const insertCategoryNode = `
    create or replace function insert_category(parent int, client int, cat_name varchar)
    returns public."CategoryMaps"
    language plpgsql
    as $$
    declare
        new_node_id integer;
        new_lft integer;
        new_row public."CategoryMaps"%ROWTYPE;
    begin
        SELECT rgt INTO new_lft FROM public."CategoryMaps"
        WHERE client_id = client and node_id = parent;
        
        if new_lft ISNULL then
            RETURN null;
        end if;
        
        SELECT get_last_node_id(client) INTO new_node_id;
        
        UPDATE public."CategoryMaps" SET rgt = rgt + 2 WHERE client_id = client and rgt >= new_lft;
        
        UPDATE public."CategoryMaps" SET lft = lft + 2 WHERE client_id = client and lft > new_lft;
        
        INSERT INTO public."CategoryMaps" (client_id, node_id, lft, rgt, parent_id, name, "createdAt", "updatedAt")
        VALUES (client, new_node_id, new_lft, (new_lft + 1), parent, cat_name, NOW(), NOW())
        RETURNING * into new_row;

        return new_row;
    end; $$`;

const insertFirstCategoryNode = `
    create or replace function insert_category_node()
    returns trigger
    language plpgsql
    as $$
    BEGIN
    	raise notice 'Value %', NEW.name;
    	INSERT INTO public."CategoryMaps" (client_id, node_id, lft, rgt, parent_id, name, "createdAt", "updatedAt")
    	values (NEW.id, 1, 1, 2, 0, 'HOME', NOW(), NOW());
    	RETURN NEW;
    END;
    $$
`;

const triggerForFirstNode = `
    DROP TRIGGER IF EXISTS insert_client
      ON public."Clients";
    CREATE TRIGGER insert_client
      AFTER INSERT
      ON public."Clients"
      FOR EACH ROW
      EXECUTE PROCEDURE insert_category_node();
`;
const sqlFunctionsAndTriggers = [
  getLasNodeForCategory,
  insertCategoryNode,
  insertFirstCategoryNode,
  triggerForFirstNode,
];
export default async (sequelize: Sequelize) => {
  for (const singleFunction of sqlFunctionsAndTriggers) {
    await sequelize.query(singleFunction);
  }
};
