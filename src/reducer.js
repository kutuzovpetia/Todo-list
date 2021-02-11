


const initialState = {

  data : [],
  display: false,
  showCreateList: false,
  onList: false,
  onSearch: false,
}

const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case 'SET_DATA':
          return {...state, data : action.data}
        case 'DATA':
          return  state.data
        case 'DISPLAY_SELECTION':
          return  {...state, display: !state.display}
        case 'DELETE_ITEM':
          return {...state, data: state.data.filter(item => item.id !== action.id)}
        case 'SHOW_CREATE_LIST':
          return {...state, showCreateList : !state.showCreateList}   
        case 'CREATE_LIST':
          return {...state, data: [action.list, ...state.data]}   
        case 'ON_LIST':
          return {...state, onList: !state.onList}
        case 'ADD_ITEM_TO_LIST':
          return {...state, data: state.data.map(item =>{
            if(item.id === action.id){
              return { ...item, lists : [...item.lists, action.obj] }
            }
            return item;
          })
        }

        case 'DELETE_ITEM_FROM_LIST':
          return {...state, data : state.data.map((item)=>{
                if(item.id === action.idCard){
                  return {...item, lists : item.lists.filter(it => it.id !== action.id)}
                }
                return item;
          }) }

        case 'ADD_NOTE':  
          return {...state, data : state.data.map((item)=>{
            if(item.id === action.idCard){
              return {...item, lists : item.lists.map((it)=>{
                if(it.id === action.id){ return {...it, note: action.value}}
                return it;
              })}
            }
            return item;
          })}

          case 'ADD_PRIORITY': 
          return {...state, data : state.data.map((item)=>{
            if(item.id === action.idCard){
              return {...item, lists : item.lists.map((it)=>{
                if(it.id === action.id){ return {...it, priority: action.value}}
                return it;
              })}
            }
            return item;
          })}

          case 'ADD_DATE': 
          return {...state, data : state.data.map((item)=>{
            if(item.id === action.idCard){
              return {...item, lists : item.lists.map((it)=>{
                if(it.id === action.id){ return {...it, date: action.value}}
                return it;
              })}
            }
            return item;
          })}

          case 'DONE_CHECKED':
            
            return {...state, data : state.data.map((item)=>{
              if(item.id === action.id){
                return {...item, lists : item.lists.map((it)=>{
                  if(it.id === action.idCard){return {...it, done : action.value}}
                  return it;
                })}
              }
              return item;
            })}
          case 'ON_SEARCH':
            return {...state, onSearch : !state.onSearch}
        default:
          return state;
    }
}

export default reducer;