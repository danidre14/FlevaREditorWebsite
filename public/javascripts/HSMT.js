const HSMT = (function HyperScriptMarkupTemplates() {
    const templates = {};
  
    const addTemplate = function(name = "undefined", id = name) {
      templates[`$$[${name}]`] = {
        id: `$$[${id}]`,
        idString: id,
        html: document.getElementById(`$$[${id}]`).outerHTML
      };
      return templates[`$$[${name}]`];
    };
  
    const getTemplate = function(name) {
      return templates[`$$[${name}]`] || addTemplate(name);
    };
  
    const generateHSMT = function(name, options, type = "template") {
      if (
        ["[object Object]", "[object Array]"].indexOf(
          Object.prototype.toString.call(options)
        ) <= -1
      )
        return options;
      let hsmtString = "";
  
      if (type === "template") {
        let { html: hsmtS, idString: templateId } = getTemplate(name);
        hsmtString = hsmtS;
  
        // change id to random id
        const IDRegExp = new RegExp(`\\$\\$\\[${templateId}\(\?\=\\\]\)`, "g"); // /\$\$\[${templateId}(?=\])/g
        hsmtString = hsmtString.replace(
          IDRegExp,
          `$&-${String(Math.random()).substr(2)}`
        );
      } else if (type === "div") {
        hsmtString = name;
      }
  
      // get array based divs
      // \$\$\[((?!\$\$\[)[^\]]+)\{((?:(?!\}\])[\s\S])*)\}\]
      const arrayRegExp = new RegExp(
        /\$\$\[((?!\$\$\[)[^\]]+)\{((?:(?!\}\])[\s\S])*)\}\]/g
      );
      const arrayDivs = [...hsmtString.matchAll(arrayRegExp)];
      if (arrayDivs !== null) {
        for (const [fMatch, key, divValue] of arrayDivs) {
          let basedHSMT = "";
          if (
            options[key] &&
            ["[object Array]"].indexOf(
              Object.prototype.toString.call(options[key])
            ) > -1
          ) {
            for (let elem of options[key])
              basedHSMT += generateHSMT(divValue, elem, "div");
          }
          hsmtString = hsmtString.replace(fMatch, basedHSMT);
        }
      }
  
      // change properties based on query
      const queryRegExp = new RegExp(
        /\$\$\[((?!\$\$\[)[^\]]+)\?((?!\$\$\[)[^\]]*)\|((?!\$\$\[)[^\]]*)\]/g
      );
  
      /*
        RegExp was originally `\$\$\[(.+)\?(.*)\:(.*)\]` but captured other groups.
        The `\$\$\[((?!\$\$\[)[^\]]*)\]`` <- don't match '$$[' and ']' within the string so I put that within each capture group
        */
      const ternaries = [...hsmtString.matchAll(queryRegExp)];
      if (ternaries !== null) {
        for (const {
          0: fMatch,
          1: key,
          2: tValue,
          3: fValue,
          index,
          mLength = fMatch.length
        } of ternaries) {
          hsmtString = hsmtString.replace(fMatch, options[key] ? tValue : fValue);
        }
      }
  
      // change properties to values in object
      for (const [key, value] of Object.entries(options))
        hsmtString = hsmtString.replaceAll(`$$[${key}]`, value);
  
      return hsmtString;
    };
  
    const hsmtMonitor = function(obj, ...renderers) {
      return new Proxy(obj, {
        get: function(obj, prop) {
          if (
            ["[object Object]", "[object Array]"].indexOf(
              Object.prototype.toString.call(obj[prop])
            ) > -1
          ) {
            return hsmtMonitor(obj[prop], ...renderers);
          }
          return obj[prop];
        },
        set: function(obj, prop, value) {
          obj[prop] = value;
          for (const renderer of renderers) renderer();
          return true;
        }
      });
    };
  
    const createHSMT = function(
      objectRef,
      htmlContainer,
      templateName,
      options = {}
    ) {
      const template = getTemplate(templateName);
      template.default = "";
        
        if(options.default) {
          template.default = options.default.outerHTML;
          options.default.outerHTML = "";
        }
  
      template.renderer = function() {
        let HTMLText = "";
        let ref = template.ref;
        if(ref.length === 0) {
          htmlContainer.innerHTML = template.default;
          return;
        }
        if (options.modifier)
          for (const [key, value] of Object.entries(options.modifier))
            ref = ref[key](value);
        if (options.attributes)
          for (let [key, value] of Object.entries(options.attributes))
            ref = ref.map(e => {
              const rets = { ...e };
              if (
                ["[object Array]"].indexOf(
                  Object.prototype.toString.call(value)
                ) <= -1
              )
                value = [value];
              value = [...new Set(value)];
              for (const elem of value)
                if (rets[elem]) rets[elem] = `${key}="${rets[elem]}"`;
              return rets;
            });
        for (let elem of ref) {
          HTMLText += generateHSMT(templateName, elem, "template");
        }
        htmlContainer.innerHTML = HTMLText;
      };
  
      const extraRenderers = options.renderers || [];
  
      template.ref = hsmtMonitor(objectRef, template.renderer, ...extraRenderers);
      template.renderer();
      return template.ref;
    };
  
    return { addTemplate, createHSMT };
  })();
  