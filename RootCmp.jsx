const Router = ReactRouterDOM.HashRouter;
const { Routes, Route } = ReactRouterDOM;

import { AppHeader } from "./cmps/AppHeader.jsx";

import { TodoIndex } from "./pages/TodoIndex.jsx";
import { TodoDetails } from "./pages/TodoDetails.jsx";
import { TodoEdit } from "./pages/TodoEdit.jsx";

import { store } from './store/store.js'

const { Provider } = ReactRedux;

export function RootCmp() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<TodoIndex />} />
                            <Route path="/todo" element={<TodoIndex />} />
                            <Route path="/todo/:todoId" element={<TodoDetails />} />
                            <Route path="/todo/edit" element={<TodoEdit />} />
                            <Route path="/todo/edit/:todoId" element={<TodoEdit />} /> 
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    );
}
