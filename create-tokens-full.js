import fs from 'fs';

// Ваш полный JSON с токенами
const tokensData = {
  "global-color-tokens": {
    "light": {
      "states": {
        "text-color": {
          "standard": { "value": "#272727" },
          "active": { "value": "#050505" },
          "disabled": { "value": "#898b8c" },
          "error": { "value": "#ed0000" }
        },
        "icon-color": {
          "standard": { "value": "#272727" },
          "active": { "value": "#050505" },
          "disabled": { "value": "#898b8c" }
        },
        "highlight": {
          "default": { "value": "rgba(235, 197, 41, 0.5000)" }
        },
        "background": {
          "disabled": { "value": "#f5f5f6" },
          "primary": {
            "standard": { "value": "#f5f5f6" },
            "hover": { "value": "#d5ddef" },
            "pressed": { "value": "#becae7" },
            "active": { "value": "#e2e2e2" },
            "disabled": { "value": "#f5f5f6" }
          },
          "secondary": {
            "standard": { "value": "#f5f5f6" },
            "hover": { "value": "#e2e2e2" },
            "pressed": { "value": "#cccccc" },
            "active": { "value": "#d5ddef" },
            "disabled": { "value": "#f5f5f6" }
          },
          "tertiary": {
            "standard": { "value": "#f5f5f6" },
            "hover": { "value": "#edf0f8" },
            "pressed": { "value": "#d5ddef" },
            "active": { "value": "#a6b7de" },
            "disabled": { "value": "#f5f5f6" }
          },
          "fourth": {
            "standard": { "value": "#f5f5f6" },
            "hover": { "value": "#edf0f8" },
            "pressed": { "value": "#d5ddef" },
            "active": { "value": "#a6b7de" },
            "disabled": { "value": "#f5f5f6" }
          }
        },
        "border": {
          "primary": {
            "standard": { "value": "#f5f5f6" },
            "hover": { "value": "#edf0f8" },
            "pressed": { "value": "#d5ddef" },
            "active": { "value": "#a6b7de" },
            "disabled": { "value": "#f5f5f6" },
            "error": { "value": "#ed0000" }
          },
          "secondary": {
            "standard": { "value": "#bcbcbd" },
            "hover": { "value": "#dde3f2" },
            "pressed": { "value": "#c6d0ea" },
            "active": { "value": "#97aad8" },
            "disabled": { "value": "#e7e7e8" },
            "error": { "value": "#ed0000" }
          }
        }
      },
      "text-color": {
        "default": { "value": "#010101" },
        "ribbon": {
          "section-name": { "value": "#272727" }
        }
      },
      "divider": {
        "ribbon": { "value": "#bcbcbd" }
      },
      "background": {
        "tooltip": { "value": "#6e6e6e" },
        "ribbon": {
          "main": { "value": "#f5f5f6" }
        },
        "palette": {
          "main": { "value": "#f5f5f6" }
        }
      }
    },
    "dark": {
      "states": {
        "text-color": {
          "standard": { "value": "#cfcfcf" },
          "active": { "value": "#ffffff" },
          "disabled": { "value": "#5e6062" },
          "error": { "value": "#f89999" }
        },
        "icon-color": {
          "standard": { "value": "#cfcfcf" },
          "active": { "value": "#ffffff" },
          "disabled": { "value": "#5e6062" }
        },
        "highlight": {
          "default": { "value": "rgba(235, 197, 41, 0.5000)" }
        },
        "background": {
          "disabled": { "value": "#f5f5f6" },
          "primary": {
            "standard": { "value": "#214bac" },
            "hover": { "value": "#395eb5" },
            "pressed": { "value": "#193882" },
            "active": { "value": "#214bac" },
            "disabled": { "value": "#f5f5f6" }
          },
          "secondary": {
            "standard": { "value": "#333538" },
            "hover": { "value": "#1f2022" },
            "pressed": { "value": "#26282a" },
            "active": { "value": "#010101" },
            "disabled": { "value": "#f5f5f6" }
          },
          "tertiary": {
            "standard": { "value": "#1e2023" },
            "hover": { "value": "#333538" },
            "pressed": { "value": "#2c2e30" },
            "active": { "value": "#f5f5f6" },
            "disabled": { "value": "#f5f5f6" }
          },
          "fourth": {
            "standard": { "value": "#141518" },
            "hover": { "value": "#1c1d20" },
            "pressed": { "value": "#252628" },
            "active": { "value": "#141518" },
            "disabled": { "value": "#f5f5f6" }
          }
        },
        "border": {
          "primary": {
            "standard": { "value": "#214bac" },
            "hover": { "value": "#395eb5" },
            "pressed": { "value": "#193882" },
            "active": { "value": "#214bac" },
            "disabled": { "value": "#656769" },
            "error": { "value": "#ed0000" }
          },
          "secondary": {
            "standard": { "value": "#505254" },
            "hover": { "value": "#505254" },
            "pressed": { "value": "#505254" },
            "active": { "value": "#505254" },
            "disabled": { "value": "#57595b" },
            "error": { "value": "#ed0000" }
          }
        }
      },
      "text-color": {
        "default": { "value": "#ffffff" },
        "ribbon": {
          "section-name": { "value": "#272727" }
        }
      },
      "divider": {
        "ribbon": { "value": "#010101" }
      },
      "background": {
        "tooltip": { "value": "#24262d" },
        "ribbon": {
          "main": { "value": "#333538" }
        },
        "palette": {
          "main": { "value": "#333538" }
        }
      }
    }
  },
  "global-dimensions": {
    "size": {
      "base": {
        "base2": { "value": "2px" },
        "base4": { "value": "4px" },
        "base6": { "value": "6px" },
        "base8": { "value": "8px" },
        "base10": { "value": "10px" },
        "base12": { "value": "12px" },
        "base14": { "value": "14px" },
        "base16": { "value": "16px" },
        "base18": { "value": "18px" },
        "base20": { "value": "20px" },
        "base22": { "value": "22px" },
        "base24": { "value": "24px" },
        "base26": { "value": "26px" },
        "base28": { "value": "28px" },
        "base30": { "value": "30px" }
      }
    }
  },
  "global-typography": {
    "font-family": {
      "font-family-commander": { "value": "Segoe UI" },
      "font-family-kudo": { "value": "Roboto" }
    },
    "font-size": {
      "font-size-lg": { "value": "14px" },
      "font-size-xl": { "value": "16px" },
      "font-size-sm": { "value": "10px" },
      "font-size-md": { "value": "12px" },
      "font-size-heading1": { "value": "32px" },
      "font-size-heading2": { "value": "26px" },
      "font-size-heading3": { "value": "24px" },
      "font-size-heading4": { "value": "20px" },
      "font-size-heading5": { "value": "16px" }
    },
    "font-weight": {
      "font-weight-sm": { "value": "300" },
      "font-weight-md": { "value": "400" },
      "font-weight-lg": { "value": "900" },
      "font-weight-xlg": { "value": "1200" }
    },
    "line-height": {
      "line-height-sm": { "value": "12px" },
      "line-height-md": { "value": "16px" },
      "line-height-lg": { "value": "20px" },
      "line-height-xlg": { "value": "26px" }
    },
    "letter-spacing": {
      "letter-spacing-sm": { "value": "-0.5px" },
      "letter-spacing-lg": { "value": "1px" }
    }
  },
  "ares-kudo": {
    "light": {
      "kudo": {
        "colors": {
          "slider": {
            "item": {
              "background": { "value": "#ffffff" }
            },
            "line": {
              "background": { "value": "#ffffff" }
            }
          },
          "tooltip": {
            "background": { "value": "#e2e2e2" },
            "border": { "value": "#898b8c" },
            "text-color": { "value": "#272727" }
          },
          "ribbon": {
            "background": {
              "main": { "value": "#f5f5f6" }
            }
          },
          "ribbon-item": {
            "divider": { "value": "#bcbcbd" },
            "icon-color": {
              "item": {
                "standard": { "value": "#272727" },
                "active": { "value": "#050505" },
                "disabled": { "value": "#898b8c" }
              }
            },
            "text-color": {
              "standard": { "value": "#272727" },
              "active": { "value": "#050505" },
              "disabled": { "value": "#898b8c" }
            },
            "background": {
              "standard": { "value": "#f5f5f6" },
              "hover": { "value": "#e2e2e2" },
              "pressed": { "value": "#cccccc" },
              "active": { "value": "#d5ddef" },
              "disabled": { "value": "#f5f5f6" }
            },
            "border": {
              "standard": { "value": "#f5f5f6" },
              "hover": { "value": "#e2e2e2" },
              "pressed": { "value": "#cccccc" },
              "active": { "value": "#d5ddef" },
              "disabled": { "value": "#f5f5f6" }
            }
          },
          "dropdown-menu": {
            "border": { "value": "#bcbcbd" }
          }
        },
        "dimensions": {
          "item": {
            "border-radius": { "value": "4px" },
            "margin": { "value": "6px" },
            "padding": {
              "top": { "value": "6px" },
              "bottom": { "value": "6px" },
              "left": { "value": "6px" },
              "right": { "value": "6px" }
            }
          }
        }
      },
      "divider": { "value": "#bcbcbd" }
    },
    "dark": {
      "kudo": {
        "colors": {
          "slider": {
            "item": {
              "background": { "value": "#efefef" }
            },
            "line": {
              "background": { "value": "#141518" }
            }
          },
          "tooltip": {
            "background": { "value": "#e2e2e2" },
            "border": { "value": "#898b8c" },
            "text-color": { "value": "#272727" }
          },
          "ribbon": {
            "background": {
              "main": { "value": "#f5f5f6" }
            }
          },
          "ribbon-item": {
            "divider": { "value": "#bcbcbd" },
            "icon-color": {
              "item": {
                "standard": { "value": "#272727" },
                "active": { "value": "#050505" },
                "disabled": { "value": "#898b8c" }
              }
            },
            "text-color": {
              "standard": { "value": "#272727" },
              "active": { "value": "#050505" },
              "disabled": { "value": "#898b8c" }
            },
            "background": {
              "standard": { "value": "#f5f5f6" },
              "hover": { "value": "#e2e2e2" },
              "pressed": { "value": "#cccccc" },
              "active": { "value": "#d5ddef" },
              "disabled": { "value": "#f5f5f6" }
            },
            "border": {
              "standard": { "value": "#bcbcbd" },
              "hover": { "value": "#dde3f2" },
              "pressed": { "value": "#c6d0ea" },
              "active": { "value": "#97aad8" },
              "disabled": { "value": "#e7e7e8" }
            }
          },
          "dropdown-menu": {
            "border": { "value": "#010101" }
          }
        },
        "dimensions": {
          "item": {
            "border-radius": { "value": "4px" },
            "margin": { "value": "6px" },
            "padding": {
              "top": { "value": "6px" },
              "bottom": { "value": "6px" },
              "left": { "value": "6px" },
              "right": { "value": "6px" }
            }
          }
        }
      },
      "divider": { "value": "#bcbcbd" }
    }
  }
};

// Сохраняем в файл
fs.writeFileSync('tokens-full.json', JSON.stringify(tokensData, null, 2));
console.log('✅ Файл tokens-full.json создан');
