const _modifiers = (base: string, modifiers: { [key: string]: boolean }) => {
  const className = Object.entries(modifiers ?? {})
    .reduce(
      (res, item) => !item[1] ? res : [...res, `${base}--${item[0]}`],
      [base]
    )
    .join(' ')

  return { className }
}

const bem = (block: string) => {
  const _block = () => {
    return {
      class: { className: block },
      modifiers: (modifiers: { [key: string]: boolean }) => _modifiers(block, modifiers)
    }
  }

  const _subElement = (element: string, sub: string) => {
    const base = `${element}-${sub}`

    return {
      class: { className: base },
      modifiers: (modifiers: { [key: string]: boolean }) => _modifiers(base, modifiers)
    }
  }

  const _element = (element: string) => {
    const base = `${block}__${element}`

    return {
      class: { className: base },
      sub: (sub: string) => _subElement(base, sub),
      modifiers: (modifiers: { [key: string]: boolean }) => _modifiers(base, modifiers)
    }
  }

  return { block: _block, element: _element }
}

export default bem
