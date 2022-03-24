function darkenBackground(background, overlayColor = "rgba(0, 0, 0, 0.125)") {
    return `linear-gradient(0, ${overlayColor} 0%, ${overlayColor} 100%), ${background}`;
}

export { darkenBackground };
//# sourceMappingURL=themeUtils.js.map
