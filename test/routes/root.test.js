import { test } from 'tap'
import { build } from '../helper.js'

test('default root route', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        url: '/'
    })
    t.same(JSON.parse(res.payload), { root: true })
})

test('get todos los contactos VACIO', async (t) => {
    //Arrange
    const app = await build(t)
    await app.inject({
        url: '/contacts/1',
        method: 'DELETE'
    })
    await app.inject({
        url: '/contacts/2',
        method: 'DELETE'
    })
    await app.inject({
        url: '/contacts/3',
        method: 'DELETE'
    })
    await app.inject({
        url: '/contacts/4',
        method: 'DELETE'
    })


    const res = await app.inject({
        url: '/contacts',
        method: 'GET'
    });
    t.equal(res.statusCode, 204, 'No hay contactos');
});

// test('get por id falla', async (t) => {
//     const app = await build(t)

//     const res = await app.inject({
//         url: '/contacts/0',
//         method: 'GET'
//     })
//     t.equal(res.statusCode, 404, 'No existe el contacto');
// });

// test('get todos los contactos', async (t) => {
//     const app = await build(t)

//     const postPayload = {
//         foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
//         nombre: 'Juan Perez',
//         sobrenombre: 'Ejemplero',
//         edad: 18,
//         email: 'juan@ejemplo.com',
//         telefono: '1234567890'
//     }

//     await app.inject({
//         url: '/contacts',
//         method: 'POST',
//         payload: postPayload
//     });

//     const res = await app.inject({
//         url: '/contacts',
//         method: 'GET'
//     })
//     t.equal(res.statusCode, 200, 'Hay contactos');
// });

// test('get por id funciona', async (t) => {
//     const app = await build(t)

//     const postPayload = {
//         foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
//         nombre: 'Juan Perez',
//         sobrenombre: 'Ejemplero',
//         edad: 18,
//         email: 'juan@ejemplo.com',
//         telefono: '1234567890'
//     }

//     const response = await app.inject({
//         url: '/contacts',
//         method: 'POST',
//         payload: postPayload
//     });


//     const res = await app.inject({
//         url: '/contacts/0',
//         method: 'GET'
//     })

//     t.equal(res.statusCode, 200, 'Existe el contacto');

// });

// test('post funciona', async (t) => {
//     const app = await build(t)

//     const postPayload = {
//         foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
//         nombre: 'Juan Perez',
//         sobrenombre: 'Ejemplero',
//         edad: 18,
//         email: 'juan@ejemplo.com',
//         telefono: '1234567890'
//     }

//     const res = await app.inject({
//         url: '/contacts',
//         method: 'POST',
//         payload: postPayload
//     });

//     t.equal(res.statusCode, 201, 'Contacto creado');
// });

// test('post falla', async (t) => {
//     const app = await build(t)

//     const postPayload = {
//         foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
//         nombre: 'Juan Perezzasadsafasfa',
//         sobrenombre: 'Ejempleroasfas',
//         edad: 7,
//         email: 'papapapapaa',
//         telefono: '12345678901231241idfsjdf'
//     }

//     const res = await app.inject({
//         url: '/contacts',
//         method: 'POST',
//         payload: postPayload
//     });

//     t.equal(res.statusCode, 400, 'Contacto no creado');
// });

// test('put falla', async (t) => {
//     const app = await build(t)

//     const postPayload = {
//         foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
//         nombre: 'Juan Perez',
//         sobrenombre: 'Ejemplero',
//         edad: 18,
//         email: 'juan@ejemplo.com',
//         telefono: '1234567890'
//     }

//     await app.inject({
//         url: '/contacts',
//         method: 'POST',
//         payload: postPayload
//     });

//     const putPayload = {
//         nombre: 'Juan Perezlkjel1k2je12e',
//         sobrenombre: 'Ejempleroaaaaaaaaaaaaaaaaa',
//         edad: 1,
//         email: '11239123',
//         telefono: '1234567890asdsadsdaf'
//     }

//     const res = await app.inject({
//         url: '/contacts/0',
//         method: 'PUT',
//         payload: putPayload
//     });

//     t.equal(res.statusCode, 400, 'Contacto no editado');
// });

// test('put funciona', async (t) => {
//     const app = await build(t)

//     const postPayload = {
//         foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
//         nombre: 'Juan Perez',
//         sobrenombre: 'Ejemplero',
//         edad: 18,
//         email: 'juan@ejemplo.com',
//         telefono: '1234567890'
//     }

//     await app.inject({
//         url: '/contacts',
//         method: 'POST',
//         payload: postPayload
//     });

//     const putPayload = {
//         foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Connor_Grill.jpg/900px-Connor_Grill.jpg',
//         nombre: 'Martin Perez',
//         sobrenombre: 'Su edit',
//         edad: 19,
//         email: 'martin@ejemplo.com',
//         telefono: '1234567890'
//     }

//     const res = await app.inject({
//         url: '/contacts/0',
//         method: 'PUT',
//         payload: putPayload
//     });

//     t.equal(res.statusCode, 200, 'Contacto editado');
// });