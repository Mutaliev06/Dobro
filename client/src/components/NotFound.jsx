import React, { useEffect } from 'react';

function NotFound(props) {

  useEffect(() => {
    document.title = "Ошибка";
  });

  return (
    <div>
      <h1>
        Ошибка: 404. Страница не найдена.
      </h1>
    </div>
  );
}

export default NotFound;