module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: 'transform-remove-unsupported-events',
    visitor: {
      CallExpression(path, state) {
        const { node } = path;
        const { events = [] } = state.opts;

        // Check if this is an event dispatch call
        if (
          t.isMemberExpression(node.callee) &&
          t.isIdentifier(node.callee.property) &&
          node.callee.property.name === 'dispatchEvent'
        ) {
          const eventType = node.arguments[0]?.type;
          if (eventType && events.includes(eventType)) {
            // Remove the event dispatch
            path.remove();
          }
        }
      },
      MemberExpression(path, state) {
        const { node } = path;
        const { events = [] } = state.opts;

        // Check if this is an event property access
        if (
          t.isIdentifier(node.property) &&
          events.includes(node.property.name)
        ) {
          // Replace with a no-op
          path.replaceWith(t.identifier('undefined'));
        }
      }
    }
  };
}; 