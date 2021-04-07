import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { decrement, increment } from "./TestReducer";

export default function SandBox() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.test.data);
  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is {data}</h3>
      <Button
        content="Increment"
        color="green"
        onClick={() => dispatch(increment(20))}
      />
      <Button
        content="Decrement"
        color="red"
        onClick={() => dispatch(decrement(10))}
      />
      <Button
        content="Open Modal"
        color="teal"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
      />
    </>
  );
}
