import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetailModal = ({ open, product, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ ...style, width: 800, display: 'flex', p: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 300, height: 300, backgroundSize: 'contain' }}
        image={product.image}
        alt={product.title}
      />
      <Box sx={{ ml: 2, overflow: 'auto' }}>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h2">{product.title}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="h6" color="green">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </Typography>
      </Box>
    </Box>
  </Modal>
);

export default ProductDetailModal;
