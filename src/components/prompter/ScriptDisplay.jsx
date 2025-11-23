import { forwardRef } from 'react';

const ScriptDisplay = forwardRef(({ content, highlightedWordIndex, settings }, ref) => {
  // Split content into words for highlighting
  const words = content.split(/(\s+)/);

  return (
    <div
      ref={ref}
      className="h-full w-full overflow-y-auto pb-screen"
      style={{ 
        paddingLeft: settings.padding,
        paddingRight: settings.padding
      }}
    >
      <div 
        className="py-screen"
        style={{ 
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight,
          fontFamily: settings.fontFamily,
          color: settings.fontColor
        }}
      >
        {settings.highlightEnabled ? (
          <div>
            {words.map((word, index) => (
              <span
                key={index}
                className="word"
                style={{
                  color: index === highlightedWordIndex * 2 
                    ? settings.highlightColor 
                    : settings.fontColor,
                  fontWeight: index === highlightedWordIndex * 2 ? 'bold' : 'normal',
                  whiteSpace: word.trim() === '' ? 'pre' : 'normal'
                }}
              >
                {word}
              </span>
            ))}
          </div>
        ) : (
          <div>{content}</div>
        )}
      </div>
    </div>
  );
});

ScriptDisplay.displayName = 'ScriptDisplay';

export default ScriptDisplay;