import { test } from 'tap'
import * as contactoService from "../../servicios/contactos.js"
test('findAllHandler204', async (t) => {
    //Arrange  
    const { findAllHandler } = await t.mockImport(
        '../../routes/contacts/index.js',   //En este archivo, cuando se importe el modulo ../../routes/contacts/index.js

        { '../../servicios/contactos.js': t.createMock( //Reemplazo los imports del archivo ../../servicios/contactos.js
            contactoService, //por los disponibles en contactoService (son los mismos). Con excepción de los
            //que se encuentran en el siguiente objeto: 
            { 
                findAll: () => {
                    console.log("FIND ALL TRUCHO");
                    return []
                }  
            }
        ) }
    )
    const request = null;

    //Mock de reply. Tiene lo mínimo necesario para funcionar en el findAllHandler.
    const reply = {
        statusCode : 200,
        payload : null,
        status: (estado) => {
            reply.statusCode = estado;
        },
        send: (data) => {
          reply.payload = data;
          return reply;
        },
      }

    //ACT: Ejecutamos findAllHandler con el mock de request, el mock de reply y a su vez el handler tiene mockeado findAll
    const res = await findAllHandler(request,reply);

    //ASSERT
    t.equal(res.statusCode, 204, 'No hay contactos');
});