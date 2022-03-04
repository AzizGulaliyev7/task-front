import camelCase from 'lodash/camelCase'

const requireModule = require.context('.', true, /^\.\/[a-zA-Z]+\/[a-zA-Z]+\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
    var regActions = /actions.js$/;
    var regMutations = /mutations.js$/;
    var regGetters = /getters.js$/;
    var regStates = /state.js$/;
    var regProperties = /properties/;

    if( fileName.search(regActions) !== -1 ) return
    else if( fileName.search(regMutations) !== -1 ) return
    else if( fileName.search(regGetters) !== -1 ) return
    else if( fileName.search(regStates) !== -1 ) return
    else if( fileName.search(regProperties) !== -1 ) return
    
    const moduleName = camelCase(
        fileName.replace(/(\.\/[a-zA-Z]+\/|\.js)/g, '')
    )
    modules[moduleName] = {
        namespaced: true,
        ...requireModule(fileName).default
    }
});

export default modules