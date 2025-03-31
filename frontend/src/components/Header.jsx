function HeaderFullText({ children }) {
    return (
        <div className="text-center relative">
            <hr className="hr-top" />
            <h1 className="text-5xl max-w-none px-8 py-8 text-wrap ">
                {children}
            </h1>
            <hr className="hr-bot" />
        </div>
    );
}

export { HeaderFullText };
