tinymce.PluginManager.add('charactercount', function (editor, url) {
  editor.ui.registry.addButton('charactercount', {
    text: '0/0',
    enabled: false,
    classes: 'charactercount',
    onAction: (api) => {},
  })

  return {
    getMetadata: function () {
      return {
        name: 'Character Count',
        url: 'https://jrsarath.github.io',
      }
    },
  }
})
