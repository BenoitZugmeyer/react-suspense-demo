import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import { fetchMovies } from "../api";
import Icon from "./Icon";
import Spinner from "./Spinner";
import "./IndexPage.css";

const MoviesFetcher = createResource(fetchMovies);

function Score({ score, icon }) {
  if (score === null || score < 0) return null;
  return (
    <>
      <Icon type={icon} size="tiny" /> {score}%
    </>
  );
}

function Movie({
  id,
  title,
  tomatoScore,
  tomatoIcon,
  popcornIcon,
  popcornScore,
  theaterReleaseDate,
  loading,
  onClick
}) {
  return (
    <div
      className={`Movie box ${loading ? "loading" : ""}`}
      onClick={() => onClick(id)}
    >
      <div className="content">
        <div className="title">{title}</div>
        <div className="sub-text">
          <Score icon={tomatoIcon} score={tomatoScore} /> ·{" "}
          <Score icon={popcornIcon} score={popcornScore} /> ·{" "}
          {theaterReleaseDate}
        </div>
      </div>
      {loading && <Spinner size="small" />}
    </div>
  );
}

export default function IndexPage({ onMovieClick, loadingMovieId }) {
  const movies = MoviesFetcher.read();
  return (
    <div className="IndexPage">
      <h1>Top Box Office</h1>
      <div>
        {movies.map(infos => (
          <Movie
            key={infos.id}
            {...infos}
            loading={infos.id === loadingMovieId}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
}
