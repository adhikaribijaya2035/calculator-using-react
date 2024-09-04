// import React from 'react'
// import { ACTIONS } from './App'

// export default function OperationButtons({dispatch, operation}) {
//   return (
//    <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload:{operation}})}>{operation}
//     </button>
//   )
// }


import React from 'react';
import { ACTIONS } from './App';

export default function OperationButtons({ dispatch, operation }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>
      {operation}
    </button>
  );
}
