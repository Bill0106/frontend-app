const classnames = (block: string) => {
  return (element?: string, modifiers?: { [key: string]: boolean }): { className: string } => {
    if (!element && !modifiers) {
      return { className: block }
    }

    const baseClass = [block, element].filter(v => v).join('__')

    const className = Object.entries(modifiers ?? {})
      .reduce((res, item) => {
        if (!item[1]) {
          return res
        }

        return [...res, `${baseClass}--${item[0]}`]
      }, [baseClass])
      .join(' ')

    return { className }
  }
}

export default classnames