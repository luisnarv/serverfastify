#!/usr/bin/env node
// import got from 'got'
// import minimist from 'minimist'
// import commist from 'commist'
// //const program = require('commist')()
// //const result = program


// const API = 'http://localhost:3000'

// const usage = (msg = 'Back office for My App') => {
//   console.log(`\n${msg}\n`)
//   console.log('add:')
//   console.log('  order: my-cli add order <id> --amount=<int> --api=<string>')
//   console.log('         my-cli add order <id> -n=<int> --api=<string>\n')
//   console.log('list:')
//   console.log('  cats:  my-cli list cats')
//   console.log('  ids:   my-cli list ids --cat=<string> --api=<string>')
//   console.log('  ids:   my-cli list ids -c=<string> --api=<string>')
// }

// //const argv= process.argv.slice(2)
// const argv= process.argv.slice(2);
// console.log("------------------>",argv)

// // const args = minimist(argv, {
// // alias: {amount : "n"},
// // string: ["api"],
// // default: {api: API}
// // })
// const args = minimist(argv, {
//   alias: [ "amount" ],
//   string: ["api"],
//   default: { api: API }
// });


  
//   // if (args._.length < 1) {
//   //   usage()
//   //   process.exit(1)
//   // }

//   if (args.length < 1) {
//     usage()
//     process.exit(1)
//   }


// const  [id,amount]  = args._
// //const  [amount]  = args._
// const {  api } = args
//  console.log("hola",args._)
//  console.log("id",id)
//  console.log("amount",amount)
//  console.log("api",api)

//   if (Number.isInteger(amount) === false) {
//     usage('Error: --amount flag is required and must be an integer')
//    process.exit(1)}
//   try {
//     await got.post(`${api}/orders/${id}`, {

//       json: {amount} 
      
//     })
//   } catch (err) {
//     console.log(err.message)
//     process.exit(1)
//   }


  
//   async function addOrder (argv) {
//     const args = minimist(argv, {
//       alias: { amount: 'n' },
//       string: ['api'],
//       default: { api: API }
//     })
//     if (args._.length < 1) {
//       usage()
//       process.exit(1)
//     }
  
//     const [ id ] = args._
//     const { amount, api } = args
  
//     if (Number.isInteger(amount) === false) {
//       usage('Error: --amount flag is required and must be an integer')
//       process.exit(1)
//     }
  
//     try {
//       await got.post(`${api}/orders/${id}`, {
//         json: { amount }
//       })
//     } catch (err) {
//       console.error(err.message)
//       process.exit(1)
//     }
//   }



//   function listCats () {
//     console.log('\nCategories:\n')
//     for (const cat of categories) console.log(cat)
//     console.log()
//   }


//   async function listIds (argv) {
//     const args = minimist(argv, {
//       alias: { cat: 'c' },
//       string: ['cat', 'api'],
//       default: { api: API }
//     })
  
//     const { cat, api } = args
//     if (!cat) {
//       usage('Error: --cat flag is required')
//       process.exit(1)
//     }
  
//     try {
//       console.log(`nCategory: ${cat}\n`)
//       console.log(' IDs:\n')
//       const products = await got(`${api}/${cat}`).json()
//       for (const { id } of products) {
//         console.log(     `${id}`)
//       }
//       console.log()
//     } catch (err) {
//       console.log(err.message)
//       process.exit(1)
//     }
  
//   }


'use strict'

import got from 'got'
import minimist from 'minimist'
// const program = require('commist')()
// const result = program
import commist from 'commist'

const API = 'http://localhost:3000'

const categories = ['confectionery', 'electronics']

const usage = (msg = 'Back office for My App') => {
  console.log(`\n${msg}\n`)
  console.log('add:')
  console.log('  order: my-cli add order <id> --amount=<int> --api=<string>')
  console.log('         my-cli add order <id> -n=<int> --api=<string>\n')
  console.log('list:')
  console.log('  cats:  my-cli list cats')
  console.log('  ids:   my-cli list ids --cat=<string> --api=<string>')
  console.log('  ids:   my-cli list ids -c=<string> --api=<string>')
}

const noMatches = commist()
  .register('add order', addOrder)
  .register('list cats', listCats)
  .register('list ids', listIds)
  .parse(process.argv.slice(2))

if (noMatches) {
  usage()
  process.exit(1)
}

async function addOrder (argv) {
  const args = minimist(argv, {
    alias: { amount: 'n' },
    string: ['api'],
    default: { api: API }
  })
  if (args._.length < 1) {
    usage()
    process.exit(1)
  }
console.log(args)
  const [ id ] = args._
  const { amount, api } = args
  let b = args._[1]
  console.log(id)

  if (Number.isInteger(b) === false) {
    usage('Error: --amount flag is required and must be an integer')
    process.exit(1)
  }

  try {
    await got.post(`${api}/orders/${id}`, {
      json: { amount:b }
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

function listCats () {
  console.log('\nCategories:\n')
  for (const cat of categories) console.log(cat)
  console.log()
}

async function listIds (argv) {
  const args = minimist(argv, {
    alias: { cat: ['c'] },
    string: ['cat', 'api'],
    default: { api: API }
  })

  const {cat,api}  = args
  let a= args._[0]
 
  if (!a) {
    usage('Error: --cat flag is required')
    process.exit(1)
  }

  try {
    console.log(` \nCategory: ${a}\n`)
    console.log('  IDs:\n')
    const products = await got(`${api}/${a}`).json()
    for (const { id } of products) {
      console.log( `${id}`)
    }
    console.log()
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }

}