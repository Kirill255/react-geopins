import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

export default ({ size, color, onClick }) => (
  <PlaceTwoTone style={{ fontSize: size, color }} onClick={onClick} />
);

/*
onClick пока не используется, мы не передаём обработчик
*/
