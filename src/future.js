import { default as React, Timeout } from "react";
import { unstable_deferredUpdates } from "react-dom";
import { createResource, createCache } from "simple-cache-provider";

const cache = createCache(() => {});

export function createFetcher(resolver) {
  const resource = createResource(resolver);
  return {
    read: key => resource.read(cache, key)
  };
}

export function Placeholder(props) {
  return (
    <Timeout ms={props.delayMs}>
      {didExpire => (didExpire ? props.fallback : props.children)}
    </Timeout>
  );
}

export class Component extends React.Component {
  deferSetState(state) {
    unstable_deferredUpdates(() => this.setState(state));
  }
}
