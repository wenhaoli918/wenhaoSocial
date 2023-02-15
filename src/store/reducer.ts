import { fromJS } from "immutable";

const defaultState: any = {
  loading:false
};

interface TAction {
  type: string;
  loading:boolean
}

function reducer(state = defaultState, action: TAction) {
  const {type,loading} = action
  let mapObj:any = fromJS(state)
  switch (type) {
    case "setLoading":
      return mapObj.set("loading", loading).toJS()
    default:
      return state;
  }
}

export default reducer;
