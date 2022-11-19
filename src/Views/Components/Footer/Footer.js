const Footer = (root) => {
  const _classes = {
    base: {
      self: 'bg-stone-700 text-stone-100 text-right grow-0 shrink-0 basis-8 flex flex-row justify-end items-center pr-4',
    }
  }
  const _self = document.createElement('footer');
    _self.className = _classes.base.self;
    _self.innerText = 'Made by J.Clark';

  root.append(_self);
}
export default Footer;