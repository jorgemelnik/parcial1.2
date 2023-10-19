import { test } from 'tap'
import { build } from '../helper.js'
import * as contactoService from "../../servicios/contactos.js"

const expectedMatch = {
    id: Number,
    nombre: String,
    sobrenombre: String,
    edad: Number,
    email: String,
    telefono: String,
}

const postPayload = {
    "foto": 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
    "nombre": "Tomás Esteves",
    "sobrenombre": "Tomy",
    "edad": 19,
    "email": "abcdefg@gmail.com",
    "telefono": "333333"
}

test('default root route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        url: '/'
    })
    t.same(JSON.parse(res.payload), { root: true })
})

test('get todos los contactos con Datos', async (t) => {
    //Arrange
    const app = await build(t)

    const res = await app.inject({
        url: '/contacts',
        method: 'GET'
    });
    t.equal(res.statusCode, 200, 'Hay contactos');
});



test('get por id falla', async (t) => {
    //ARRANGE
    const app = await build(t)

    //ACT
    const res = await app.inject({
        url: '/contacts/0',
        method: 'GET'
    })
    //ASSERT
    t.equal(res.statusCode, 404, 'No existe el contacto');
});

test('post funciona', async (t) => {
    //ARRANGE
    const app = await build(t)

    //ACT
    const res = await app.inject({
        url: '/contacts',
        method: 'POST',
        payload: postPayload
    });
    const contactoCreado = JSON.parse(res.payload);
    postPayload.id = contactoCreado.id;

    //ASSERT
    t.equal(res.statusCode, 201, 'Contacto creado');
    t.match(contactoCreado, expectedMatch, "Coinciden los tipos de datos en las propiedades");
    t.strictSame(postPayload, contactoCreado);
});

test('post falla', async (t) => {
    //ARRANGE
    const app = await build(t)

    const postPayloadMal = {
        ...postPayload,
        sobrenombre: 'Demasiado largo es este sobrenombre',
    }

    //ACT
    const res = await app.inject({
        url: '/contacts',
        method: 'POST',
        payload: postPayloadMal
    });

    //ASSERT
    t.equal(res.statusCode, 400, 'Contacto no creado');
    //FIXME: Si me interesa puedo chequear la estructura de la respuesta
});

test('get por id funciona', async (t) => {
    //arrange
    const app = await build(t)

    const response = await app.inject({
        url: '/contacts',
        method: 'POST',
        payload: postPayload
    });
    const contactoCreado = JSON.parse(response.payload);
    postPayload.id = contactoCreado.id;

    //Act
    const res = await app.inject({
        url: `/contacts/${contactoCreado.id}`,
        method: 'GET'
    })
    const contactoObtenido = JSON.parse(res.payload);

    //Assert
    t.equal(res.statusCode, 200, 'Existe el contacto');
    t.match(contactoObtenido, expectedMatch, "Coinciden los tipos de datos en las propiedades");
    t.strictSame(postPayload, contactoObtenido);
});

test('put falla', async (t) => {
    //ARRANGE
    const app = await build(t)

    await app.inject({
        url: '/contacts',
        method: 'POST',
        payload: postPayload
    });

    const putPayload = {
        ...postPayload,
        edad: 10,
    }

    //ACT
    const res = await app.inject({
        url: '/contacts/0',
        method: 'PUT',
        payload: putPayload
    });

    //ASSERT
    t.equal(res.statusCode, 400, 'Contacto no editado');
});

test('put funciona', async (t) => {
    //ARRANGE
    const app = await build(t)

    const response = await app.inject({
        url: '/contacts',
        method: 'POST',
        payload: postPayload
    });
    const contactoCreado = JSON.parse(response.payload);
    contactoCreado.sobrenombre = "Tomas";

    //ACT
    const res = await app.inject({
        url: `/contacts/${contactoCreado.id}`,
        method: 'PUT',
        payload: contactoCreado
    });
    const res2 = await app.inject({
        url: `/contacts/${contactoCreado.id}`,
        method: 'GET'
    });
    const contactoObtenido = JSON.parse(res2.payload);

    //ASSERT
    t.equal(res.statusCode, 200, 'Contacto editado');
    t.match(contactoObtenido, expectedMatch, "Coinciden los tipos de datos en las propiedades");
    t.strictSame(contactoCreado, contactoObtenido);
});

test('DELETE funciona', async (t) => {
    //ARRANGE
    const app = await build(t)

    const res = await app.inject({
        url: '/contacts',
        method: 'POST',
        payload: postPayload
    });
    const contactoCreado = JSON.parse(res.payload);
    postPayload.id = contactoCreado.id;

    //ACT
    const resDelete = await app.inject({
        url: `/contacts/${contactoCreado.id}`,
        method: 'DELETE',
    });
    const resGet = await app.inject({
        url: `/contacts/${contactoCreado.id}`,
        method: 'GET',
    });

    //ASSERT
    t.equal(resDelete.statusCode, 204, 'Contacto Eliminado');
    t.equal(resGet.statusCode, 404, 'Contacto ya no existe');

});

test('DELETE not found', async (t) => {
    //ARRANGE
    const app = await build(t)


    //ACT
    const resDelete = await app.inject({
        url: `/contacts/0`,
        method: 'DELETE',
    });


    t.equal(resDelete.statusCode, 404, 'Contacto no existe');

});

test('PUT not found', async (t) => {
    //ARRANGE
    const app = await build(t)


    //ACT
    const resDelete = await app.inject({
        url: `/contacts/0`,
        method: 'PUT',
        payload: {
            ...postPayload,
            id: 0,
        }
    });

    //ASSERT
    t.equal(resDelete.statusCode, 404, 'Contacto no existe');

});

test('PUT badRequest', async (t) => {
    //ARRANGE
    const app = await build(t)


    //ACT
    const resDelete = await app.inject({
        url: `/contacts/0`,
        method: 'PUT',
        payload: {
            ...postPayload,
            id: 1,
        }
    });

    //ASSERT
    t.equal(resDelete.statusCode, 400, 'Bad Request');

});