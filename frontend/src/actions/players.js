import React from "react";
import axios from "axios";
import { GET_PLAYERS } from "./types";
import { createMessage, returnErrors } from "./messages";

export const getPlayers = () => dispatch => {
  axios
    .get("api/player")
    .then(res => {
      dispatch({
        type: GET_PLAYERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
